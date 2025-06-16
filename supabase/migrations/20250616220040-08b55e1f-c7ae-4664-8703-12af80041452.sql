
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create mentor profiles table
CREATE TABLE public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bio TEXT,
  experience_years INTEGER,
  expertise_areas TEXT[], -- Array of expertise areas
  company TEXT,
  job_title TEXT,
  desired_monthly_income DECIMAL(10,2),
  calculated_hourly_rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create booking sessions table
CREATE TABLE public.booking_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES mentor_profiles(id) ON DELETE CASCADE,
  mentee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_title TEXT NOT NULL,
  session_description TEXT,
  hourly_rate DECIMAL(10,2) NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  nowledge_fee DECIMAL(10,2) NOT NULL, -- 10% fee
  mentor_payout DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Mentor profiles policies
CREATE POLICY "Anyone can view active mentor profiles" ON public.mentor_profiles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can manage their own mentor profile" ON public.mentor_profiles
  FOR ALL USING (auth.uid() = user_id);

-- Booking sessions policies
CREATE POLICY "Users can view their bookings as mentor or mentee" ON public.booking_sessions
  FOR SELECT USING (
    auth.uid() = mentee_id OR 
    auth.uid() = (SELECT user_id FROM mentor_profiles WHERE id = mentor_id)
  );

CREATE POLICY "Users can create bookings" ON public.booking_sessions
  FOR INSERT WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Mentors can update their booking sessions" ON public.booking_sessions
  FOR UPDATE USING (
    auth.uid() = (SELECT user_id FROM mentor_profiles WHERE id = mentor_id)
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
