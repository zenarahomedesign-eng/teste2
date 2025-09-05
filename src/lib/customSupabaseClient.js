import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkqlpdkxzahxipvltlsp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcWxwZGt4emFoeGlwdmx0bHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NTcwNDEsImV4cCI6MjA3MjUzMzA0MX0.IsP-j3l9VQlAVbEgNGNaagD_73X-QLY2d2obUs_alOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);