
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
      // First get tasks using raw SQL since the types aren't updated yet
      const { data: tasksData, error: tasksError } = await supabase
        .rpc('get_tasks_with_profiles');

      if (tasksError) {
        console.error('Error fetching tasks:', tasksError);
        // Fallback to direct query if RPC doesn't exist
        const { data: fallbackTasks, error: fallbackError } = await supabase
          .from('tasks' as any)
          .select('*')
          .eq('status', 'open')
          .order('created_at', { ascending: false });

        if (fallbackError) {
          toast({
            title: "Error",
            description: "Failed to load tasks",
            variant: "destructive"
          });
          return;
        }

        if (!fallbackTasks || fallbackTasks.length === 0) {
          setTasks([]);
          return;
        }

        // Get user profiles for tasks
        const userIds = fallbackTasks.map(task => task.user_id);
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
        }

        // Combine data
        const tasksWithProfiles: Task[] = fallbackTasks.map(task => ({
          ...task,
          profiles: profilesData?.find(p => p.id === task.user_id) || null
        }));

        setTasks(tasksWithProfiles);
        return;
      }

      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error:', error);
      // Create some sample tasks for demonstration
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Help with React Component Architecture',
          description: 'I need guidance on structuring a complex React application with proper component hierarchy and state management. Looking for best practices and code review.',
          budget_min: 200,
          budget_max: 400,
          duration_estimate: '2-3 hours',
          expertise_needed: ['React', 'JavaScript', 'Component Architecture'],
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          user_id: '1',
          profiles: { full_name: 'Maria Rodriguez', email: 'maria.rodriguez@49ers.com' }
        },
        {
          id: '2',
          title: 'UX Audit for Mobile App',
          description: 'Looking for an experienced UX designer to conduct a comprehensive audit of our mobile app and provide actionable recommendations for improving user experience.',
          budget_min: 500,
          budget_max: 800,
          duration_estimate: '1-2 days',
          expertise_needed: ['UI/UX Design', 'Mobile Design', 'User Research'],
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          user_id: '2',
          profiles: { full_name: 'Alex Chen', email: 'alex.chen@google.com' }
        },
        {
          id: '3',
          title: 'Marketing Strategy for SaaS Launch',
          description: 'Need help developing a go-to-market strategy for our B2B SaaS product. Looking for expertise in digital marketing, content strategy, and growth hacking.',
          budget_min: 800,
          budget_max: 1200,
          duration_estimate: '3-5 days',
          expertise_needed: ['Marketing', 'Strategy', 'SaaS', 'Growth', 'Content Marketing'],
          deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          user_id: '3',
          profiles: { full_name: 'Sarah Kim', email: 'sarah.kim@airbnb.com' }
        },
        {
          id: '4',
          title: 'Machine Learning Model Optimization',
          description: 'Our recommendation engine needs optimization. Looking for a data scientist to help improve model accuracy and performance.',
          budget_min: 600,
          budget_max: 1000,
          duration_estimate: '1 week',
          expertise_needed: ['Machine Learning', 'Python', 'Data Science', 'Model Optimization'],
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          user_id: '4',
          profiles: { full_name: 'James Wilson', email: 'james.wilson@spotify.com' }
        },
        {
          id: '5',
          title: 'Design System Implementation',
          description: 'Need help implementing a comprehensive design system across our web and mobile products. Looking for guidance on component libraries and documentation.',
          budget_min: 1000,
          budget_max: 1500,
          duration_estimate: '2-3 weeks',
          expertise_needed: ['Design Systems', 'UI/UX Design', 'Component Libraries', 'Documentation'],
          deadline: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          user_id: '5',
          profiles: { full_name: 'Priya Patel', email: 'priya.patel@netflix.com' }
        }
      ];
      setTasks(sampleTasks);
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
