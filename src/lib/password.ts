// Password helpers: complexity validation + HaveIBeenPwned check (k-anonymity)

const toHex = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer);
  const hexCodes: string[] = [];
  for (let i = 0; i < byteArray.length; i++) {
    const value = byteArray[i].toString(16).padStart(2, '0');
    hexCodes.push(value);
  }
  return hexCodes.join('').toUpperCase();
};

const sha1 = async (text: string) => {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest('SHA-1', data);
  return toHex(hash);
};

export const validatePasswordComplexity = (password: string): string | null => {
  if (!password || password.length < 12) {
    return 'Password must be at least 12 characters long.';
  }
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Include at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Include at least one number.';
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return 'Include at least one symbol.';
  return null;
};

// Returns number of breaches found for the given password
export const checkPwnedPassword = async (password: string): Promise<number> => {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  if (!res.ok) return 0; // fail-closed silently
  const text = await res.text();
  const lines = text.split('\n');
  for (const line of lines) {
    const [suf, countStr] = line.trim().split(':');
    if (suf === suffix) return parseInt(countStr || '0', 10) || 0;
  }
  return 0;
};
