import {supabase} from "@/provider/supabase";

type SetSession = {
    access_token: string;
    refresh_token: string;
}
export const setSession = async (ctx: SetSession) => {
    const sb = supabase();
    return sb.auth.setSession({
        access_token: ctx.access_token,
        refresh_token: ctx.refresh_token,
    })
}