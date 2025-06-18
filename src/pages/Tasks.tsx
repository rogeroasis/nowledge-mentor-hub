
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Task {
  id: string;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  duration_estimate: string;
  expertise_needed: string[];
  deadline: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

const Tasks = () => {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // First get tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive"
        });
        return;
      }

      if (!tasksData || tasksData.length === 0) {
        setTasks([]);
        return;
      }

      // Get user profiles for tasks
      const userIds = tasksData.map(task => task.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Combine data
      const tasksWithProfiles: Task[] = tasksData.map(task => ({
        ...task,
        profiles: profilesData?.find(p => p.id === task.user_id) || null
      }));

      setTasks(tasksWithProfiles);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTasksLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || tasksLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading tasks...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">AVAILABLE TASKS</h1>
          <p className="text-gray-600">
            Find tasks that match your expertise and help others achieve their goals
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No tasks available</h3>
            <p className="text-gray-600">Check back later for new opportunities!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Card key={task.id} className="border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {task.profiles?.full_name || 'Anonymous'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700 line-clamp-3">{task.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-bold">
                      ${task.budget_min} - ${task.budget_max}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{task.duration_estimate}</span>
                  </div>

                  {task.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {formatDate(task.deadline)}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {task.expertise_needed?.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-black">
                        {skill}
                      </Badge>
                    ))}
                    {task.expertise_needed?.length > 3 && (
                      <Badge variant="outline" className="text-xs border-black">
                        +{task.expertise_needed.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    className="w-full mt-4 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none font-bold"
                    onClick={() => {
                      toast({
                        title: "Interest Noted",
                        description: "Task proposal feature coming soon!",
                      });
                    }}
                  >
                    APPLY FOR TASK
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tasks;
