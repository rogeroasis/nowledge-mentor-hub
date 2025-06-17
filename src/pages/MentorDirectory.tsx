
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BookingModal from '@/components/BookingModal';

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
      const { data, error } = await supabase
        .from('mentor_profiles')
        .select(`
          *,
          profiles!inner (
            full_name,
            email
          )
        `)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching mentors:', error);
        toast({
          title: "Error",
          description: "Failed to load mentors",
          variant: "destructive"
        });
      } else {
        console.log('Fetched mentors:', data);
        setMentors(data || []);
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
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-black p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">FIND YOUR MENTOR</h1>
          <p className="text-gray-600">Connect with experienced professionals to accelerate your growth</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No mentors available yet</h3>
            <p className="text-gray-600">Be the first to join as a mentor!</p>
            <Button 
              className="mt-4 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none"
              onClick={() => window.location.href = '/auth'}
            >
              BECOME A MENTOR
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center font-bold">
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
                  <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
                  
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
                      <Badge key={index} variant="outline" className="text-xs border-black">
                        {area}
                      </Badge>
                    ))}
                    {mentor.expertise_areas?.length > 3 && (
                      <Badge variant="outline" className="text-xs border-black">
                        +{mentor.expertise_areas.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => handleBookMentor(mentor)}
                    className="w-full mt-4 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none font-bold"
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
