
import { useState, useEffect } from 'react';
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

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // For now, we'll use sample data since the tasks table doesn't exist in the database yet
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
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, refetch: fetchTasks };
};
