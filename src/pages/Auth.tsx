
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { cleanupAuthState } from '@/lib/authCleanup';
import { validatePasswordComplexity, checkPwnedPassword } from '@/lib/password';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up any previous auth state to avoid limbo
      cleanupAuthState();
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (_) {
        // ignore
      }

      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Full name is required",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        // Enforce strong password and check against known breaches
        const complexityError = validatePasswordComplexity(password);
        if (complexityError) {
          toast({ title: "Weak password", description: complexityError, variant: "destructive" });
          setLoading(false);
          return;
        }

        const breachCount = await checkPwnedPassword(password);
        if (breachCount > 0) {
          toast({
            title: "Compromised password",
            description: `This password appears in ${breachCount} known breaches. Please choose a different one.`,
            variant: "destructive"
          });
          setLoading(false);
          return;
        }

        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else {
        if (!isLogin) {
          toast({
            title: "Success",
            description: "Account created successfully! Please check your email to verify your account.",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've been signed in successfully.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-2 border-black shadow-[4px_4px_0_0_#000]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            {isLogin ? 'SIGN IN' : 'JOIN NOWLEDGE'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Access your mentor dashboard' 
              : 'Start your journey as a mentor or find one'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
                minLength={12}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-bold py-2 rounded shadow-[3px_3px_0_0_#000] hover:shadow-none transition"
            >
              {loading ? 'LOADING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm underline font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
