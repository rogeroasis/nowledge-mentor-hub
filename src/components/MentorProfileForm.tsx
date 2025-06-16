
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MentorProfileFormProps {
  onProfileCreated: () => void;
}

const MentorProfileForm: React.FC<MentorProfileFormProps> = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    bio: '',
    experienceYears: '',
    company: '',
    jobTitle: '',
    desiredMonthlyIncome: '',
    expertiseAreas: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Calculate hourly rate based on desired monthly income
  const calculateHourlyRate = (monthlyIncome: number) => {
    // 160 hours per month, 3x multiplier to make it attractive
    const baseHourlyRate = monthlyIncome / 160;
    return Math.round(baseHourlyRate * 3);
  };

  const calculatedHourlyRate = formData.desiredMonthlyIncome 
    ? calculateHourlyRate(parseFloat(formData.desiredMonthlyIncome))
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const expertiseArray = formData.expertiseAreas
        .split(',')
        .map(area => area.trim())
        .filter(area => area.length > 0);

      const { error } = await supabase
        .from('mentor_profiles')
        .insert({
          user_id: user.id,
          bio: formData.bio,
          experience_years: parseInt(formData.experienceYears),
          company: formData.company,
          job_title: formData.jobTitle,
          desired_monthly_income: parseFloat(formData.desiredMonthlyIncome),
          calculated_hourly_rate: calculatedHourlyRate,
          expertise_areas: expertiseArray,
          is_active: true,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your mentor profile has been created successfully.",
      });
      
      onProfileCreated();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create mentor profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Current Company *
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
          placeholder="e.g., Google, Microsoft, Startupco"
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
          Job Title *
        </label>
        <input
          id="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
          placeholder="e.g., Senior Software Engineer, Product Manager"
        />
      </div>

      <div>
        <label htmlFor="experienceYears" className="block text-sm font-medium mb-1">
          Years of Experience *
        </label>
        <input
          id="experienceYears"
          type="number"
          min="1"
          max="50"
          value={formData.experienceYears}
          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <div>
        <label htmlFor="desiredMonthlyIncome" className="block text-sm font-medium mb-1">
          Desired Monthly Full-Time Income (USD) *
        </label>
        <input
          id="desiredMonthlyIncome"
          type="number"
          min="1000"
          step="100"
          value={formData.desiredMonthlyIncome}
          onChange={(e) => setFormData({ ...formData, desiredMonthlyIncome: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
          placeholder="5000"
        />
        {calculatedHourlyRate > 0 && (
          <div className="mt-2 p-3 bg-gray-50 border-2 border-black rounded">
            <p className="font-medium">Your calculated hourly rate: <span className="text-lg font-bold">${calculatedHourlyRate}/hour</span></p>
            <p className="text-sm text-gray-600 mt-1">
              Based on 160 hours/month with 3x multiplier to make mentoring attractive
            </p>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="expertiseAreas" className="block text-sm font-medium mb-1">
          Areas of Expertise *
        </label>
        <input
          id="expertiseAreas"
          type="text"
          value={formData.expertiseAreas}
          onChange={(e) => setFormData({ ...formData, expertiseAreas: e.target.value })}
          className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
          placeholder="React, Node.js, Product Management, Marketing (separate with commas)"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-1">
          Bio - Tell people about yourself *
        </label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full min-h-[120px] px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
          required
          placeholder="Share your experience, what you can help with, and what makes you a great mentor..."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white font-bold py-3 rounded shadow-[3px_3px_0_0_#000] hover:shadow-none transition"
      >
        {loading ? 'CREATING PROFILE...' : 'CREATE MENTOR PROFILE'}
      </Button>
    </form>
  );
};

export default MentorProfileForm;
