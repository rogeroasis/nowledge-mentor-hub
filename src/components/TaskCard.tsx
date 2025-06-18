
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApply = () => {
    toast({
      title: "Interest Noted",
      description: "Task proposal feature coming soon!",
    });
  };

  return (
    <Card className="border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-shadow">
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
          onClick={handleApply}
        >
          APPLY FOR TASK
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
