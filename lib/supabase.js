import { createClient } from "@supabase/supabase-js";
import dotnev from "dotenv";
dotnev.config();

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
