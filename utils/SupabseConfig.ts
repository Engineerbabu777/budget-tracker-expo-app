import secrets from '@/secrets'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient("https://bfmqgwgdwwpkvvzoetkg.supabase.co", secrets.SUPABSE_KEY)
