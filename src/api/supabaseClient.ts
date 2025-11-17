import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// --- DEBUG LOG ---
// This will show in the browser console. Check if the URL is correct.
console.log('Supabase URL:', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in .env');
}

/**
 * @description Initializes and exports the Supabase client.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);