import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://elnxxlqexqmepcebgfxo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsbnh4bHFleHFtZXBjZWJnZnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NzEyMDgsImV4cCI6MjA5NDI0NzIwOH0.LSYrwufckNfgrD9QK8ijG-d2Y2zVlnvMZ5t5nKtRh2Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
