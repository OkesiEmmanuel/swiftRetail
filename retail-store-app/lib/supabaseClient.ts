import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// A simple boolean flag you can use elsewhere in your app
export const usingSupabase = Boolean(supabaseUrl && supabaseAnonKey);

let supabase: SupabaseClient | null = null;

// Only initialize Supabase if both env vars exist
if (usingSupabase) {
  supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
} else {
  console.warn(
    '⚠️ Supabase environment variables missing. Some data features will be disabled.'
  );
}

export { supabase };
