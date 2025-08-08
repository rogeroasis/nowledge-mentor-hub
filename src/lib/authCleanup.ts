// Utility to clean up any lingering Supabase auth keys to prevent limbo states
export const cleanupAuthState = () => {
  try {
    // Remove standard and namespaced auth tokens from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });

    // Remove from sessionStorage as well
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (_) {
    // Ignore cleanup errors
  }
};
