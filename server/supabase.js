import { createClient } from '@supabase/supabase-js'



// Create a single supabase client for interacting with your database
export const supabase = createClient('https://wsrglamnyisprezaahdg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzcmdsYW1ueWlzcHJlemFhaGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDI0OTgsImV4cCI6MjA4NzkxODQ5OH0.c4cMrYKwJUOy9fZJaxrdre7CQY1A6jw04FL6bxLMG6U')