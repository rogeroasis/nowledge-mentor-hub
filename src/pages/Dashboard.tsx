
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import MentorProfileForm from '@/components/MentorProfileForm';
import { useToast } from '@/hooks/use-toast';
import { Users, Briefcase, Plus } from 'lucide-react';

interface MentorProfile {
  id: string;
  bio: string;
  experience_years: number;
  expertise_areas: string[];
  company: string;
  job_title: string;
  desired_monthly_income: number;
  calculated_hourly_rate: number;
  is_active: boolean;
}

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMentorProfile();
    }
  }, [user]);

  const fetchMentorProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('mentor_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching mentor profile:', error);
        toast({
          title: "Error",
          description: "Failed to load mentor profile",
          variant: "destructive"
        });
      } else if (data) {
        setMentorProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-black p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight">NOWLEDGE DASHBOARD</h1>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-none"
          >
            SIGN OUT
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Welcome, {user.email}</h2>
          <p className="text-gray-600">
            {mentorProfile 
              ? 'Manage your mentor profile and explore opportunities' 
              : 'Set up your mentor profile to start earning money sharing your expertise'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-shadow cursor-pointer"
                onClick={() => navigate('/mentors')}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">Browse Mentors</h3>
              <p className="text-sm text-gray-600">Find other mentors</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-shadow cursor-pointer"
                onClick={() => navigate('/tasks')}>
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">Available Tasks</h3>
              <p className="text-sm text-gray-600">Find work opportunities</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-shadow cursor-pointer"
                onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Task creation feature will be available soon!",
                  });
                }}>
            <CardContent className="p-6 text-center">
              <Plus className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-bold">Post a Task</h3>
              <p className="text-sm text-gray-600">Get help with your project</p>
            </CardContent>
          </Card>
        </div>

        {!mentorProfile ? (
          <Card className="border-2 border-black shadow-[4px_4px_0_0_#000]">
            <CardHeader>
              <CardTitle>Create Your Mentor Profile</CardTitle>
              <CardDescription>
                Share your expertise and start earning money by mentoring others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MentorProfileForm onProfileCreated={fetchMentorProfile} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-black shadow-[4px_4px_0_0_#000]">
              <CardHeader>
                <CardTitle>Your Mentor Profile</CardTitle>
                <CardDescription>Your current mentor settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Company:</strong> {mentorProfile.company}</p>
                <p><strong>Role:</strong> {mentorProfile.job_title}</p>
                <p><strong>Experience:</strong> {mentorProfile.experience_years} years</p>
                <p><strong>Hourly Rate:</strong> ${mentorProfile.calculated_hourly_rate}/hour</p>
                <p><strong>Expertise:</strong> {mentorProfile.expertise_areas.join(', ')}</p>
                <p><strong>Status:</strong> {mentorProfile.is_active ? 'Active' : 'Inactive'}</p>
                <Button 
                  className="mt-4 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none"
                  onClick={() => setMentorProfile(null)}
                >
                  EDIT PROFILE
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0_0_#000]">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent bookings and tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No recent activity. Start by browsing available tasks or promoting your profile!</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm"
                    onClick={() => navigate('/tasks')}
                    className="bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none"
                  >
                    VIEW TASKS
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/mentors')}
                    className="border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-none"
                  >
                    BROWSE MENTORS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
