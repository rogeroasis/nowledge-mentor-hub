import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookingModal from '@/components/BookingModal';
import { mentorsMock } from '@/data/mockMentors';

interface MentorProfile {
  id: string;
  bio: string;
  experience_years: number;
  expertise_areas: string[];
  company: string;
  job_title: string;
  calculated_hourly_rate: number;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

const MentorDirectory = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      // Fetch mentor profiles and their corresponding user profiles separately
      const { data: mentorData, error: mentorError } = await supabase
        .from('mentor_profiles')
        .select('*')
        .eq('is_active', true);

      if (mentorError) {
        console.error('Error fetching mentors:', mentorError);
        toast({
          title: "Error",
          description: "Failed to load mentors",
          variant: "destructive"
        });
        return;
      }

      if (!mentorData || mentorData.length === 0) {
        // Fallback to mock mentors when DB is empty
        const mapped = mentorsMock.map((m) => ({
          id: m.id,
          bio: m.bio,
          experience_years: (m as any).experience_years ?? 6,
          expertise_areas: m.expertise,
          company: m.company,
          job_title: m.role,
          calculated_hourly_rate: m.hourlyRate,
          user_id: m.id,
          profiles: {
            full_name: m.name,
            email: m.email,
          },
        })) as MentorProfile[];
        setMentors(mapped);
        return;
      }

      // Get user IDs from mentor profiles
      const userIds = mentorData.map(mentor => mentor.user_id);

      // Fetch corresponding profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast({
          title: "Error",
          description: "Failed to load mentor profiles",
          variant: "destructive"
        });
        return;
      }

      // Combine mentor data with profile data
      const mentorsWithProfiles: MentorProfile[] = mentorData
        .map(mentor => {
          const profile = profilesData?.find(p => p.id === mentor.user_id);
          return {
            ...mentor,
            profiles: profile ? {
              full_name: profile.full_name || '',
              email: profile.email
            } : null
          };
        })
        .filter(mentor => mentor.profiles !== null); // Only include mentors with valid profiles

      console.log('Fetched mentors:', mentorsWithProfiles);

      if (!mentorsWithProfiles || mentorsWithProfiles.length === 0) {
        const mapped = mentorsMock.map((m) => ({
          id: m.id,
          bio: m.bio,
          experience_years: (m as any).experience_years ?? 6,
          expertise_areas: m.expertise,
          company: m.company,
          job_title: m.role,
          calculated_hourly_rate: m.hourlyRate,
          user_id: m.id,
          profiles: {
            full_name: m.name,
            email: m.email,
          },
        })) as MentorProfile[];
        setMentors(mapped);
      } else {
        setMentors(mentorsWithProfiles);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookMentor = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading mentors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">FIND YOUR MENTOR</h1>
          <p className="text-muted-foreground">Connect with experienced professionals to accelerate your growth</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No mentors available yet</h3>
            <p className="text-gray-600">Be the first to join as a mentor!</p>
            <Button 
              className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.href = '/auth'}
            >
              BECOME A MENTOR
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center font-bold">
                      {mentor.profiles?.full_name?.[0] || 'M'}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{mentor.profiles?.full_name || 'Mentor'}</CardTitle>
                      <CardDescription className="font-medium">{mentor.job_title}</CardDescription>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-black/70">{mentor.company}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{mentor.experience_years} years experience</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <DollarSign className="h-4 w-4" />
                    <span>${mentor.calculated_hourly_rate}/hour</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise_areas?.slice(0, 3).map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-border">
                        {area}
                      </Badge>
                    ))}
                    {mentor.expertise_areas?.length > 3 && (
                      <Badge variant="outline" className="text-xs border-border">
                        +{mentor.expertise_areas.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => handleBookMentor(mentor)}
                    className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                  >
                    BOOK SESSION
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedMentor(null);
          }}
          onBookingSuccess={() => {
            setShowBookingModal(false);
            setSelectedMentor(null);
            toast({
              title: "Booking Requested",
              description: "Your booking request has been sent to the mentor",
            });
          }}
        />
      )}
    </div>
  );
};

export default MentorDirectory;
