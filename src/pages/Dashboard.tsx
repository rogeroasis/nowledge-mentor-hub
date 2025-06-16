
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import MentorProfileForm from '@/components/MentorProfileForm';
import { useToast } from '@/hooks/use-toast';

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
              ? 'Manage your mentor profile and bookings' 
              : 'Set up your mentor profile to start earning money sharing your expertise'
            }
          </p>
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
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your upcoming mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No bookings yet. Share your profile to get started!</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
