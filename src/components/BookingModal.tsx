
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface BookingModalProps {
  mentor: MentorProfile;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

const BookingModal = ({ mentor, isOpen, onClose, onBookingSuccess }: BookingModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [durationHours, setDurationHours] = useState(1);

  const totalAmount = mentor.calculated_hourly_rate * durationHours;
  const nowledgeFee = totalAmount * 0.1;
  const mentorPayout = totalAmount - nowledgeFee;

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a session",
        variant: "destructive"
      });
      return;
    }

    if (!sessionTitle || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':');
      const scheduledDateTime = new Date(selectedDate);
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes));

      const { error } = await supabase
        .from('booking_sessions')
        .insert({
          mentor_id: mentor.id,
          mentee_id: user.id,
          session_title: sessionTitle,
          session_description: sessionDescription,
          hourly_rate: mentor.calculated_hourly_rate,
          duration_hours: durationHours,
          total_amount: totalAmount,
          nowledge_fee: nowledgeFee,
          mentor_payout: mentorPayout,
          scheduled_at: scheduledDateTime.toISOString(),
          status: 'pending'
        });

      if (error) {
        console.error('Error creating booking:', error);
        toast({
          title: "Booking Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        onBookingSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md border-2 border-black shadow-[4px_4px_0_0_#000]">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              You need to sign in to book a mentoring session.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3">
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="flex-1 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none"
            >
              SIGN IN
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 border-2 border-black">
              CANCEL
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-2 border-black shadow-[4px_4px_0_0_#000] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Session with {mentor.profiles?.full_name}</DialogTitle>
          <DialogDescription>
            {mentor.job_title} at {mentor.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Session Title *</Label>
            <Input
              id="title"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              placeholder="e.g., Career advice for software engineers"
              className="border-2 border-black"
            />
          </div>

          <div>
            <Label htmlFor="description">Session Description</Label>
            <Textarea
              id="description"
              value={sessionDescription}
              onChange={(e) => setSessionDescription(e.target.value)}
              placeholder="Describe what you'd like to discuss..."
              className="border-2 border-black"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-2 border-black"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-black">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="border-2 border-black"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration">Duration (hours)</Label>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4" />
              <Input
                id="duration"
                type="number"
                min="1"
                max="8"
                value={durationHours}
                onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)}
                className="border-2 border-black w-20"
              />
              <span className="text-sm text-gray-600">hours</span>
            </div>
          </div>

          <div className="border-2 border-black p-4 rounded bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-bold">Pricing Breakdown</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Hourly Rate:</span>
                <span>${mentor.calculated_hourly_rate}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{durationHours} hour(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Nowledge Fee (10%):</span>
                <span>${nowledgeFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleBooking}
              disabled={loading}
              className="flex-1 bg-black text-white shadow-[2px_2px_0_0_#000] hover:shadow-none font-bold"
            >
              {loading ? 'BOOKING...' : 'REQUEST BOOKING'}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-2 border-black"
            >
              CANCEL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
