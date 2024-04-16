import {createClient} from "@supabase/supabase-js";

export const supabase = () => {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_API_URL as string;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_API_KEY as string;
    return createClient(SUPABASE_URL,SUPABASE_KEY);
}

