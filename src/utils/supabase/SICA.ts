import {supabase} from "@/provider/supabase";

export const getSICABalance = async (id: string) => {
    try {
        const sb = supabase()
        return sb.from('SICA')
            .select('*').eq('userId', id).single()
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const updateStakedSICABalance = async (id: string, amount: number) => {
    try {
        const sb = supabase()
        return sb.from('SICA')
            .update({staked: amount})
            .eq('userId', id)
    } catch (error: any) {
        throw new Error(error?.message)
    }
}
export const updateBonusSICABalance = async (id: string, amount: number) => {
    try {
        const sb = supabase()
        return sb.from('SICA')
            .update({bonus: amount})
            .eq('userId', id)
    } catch (error: any) {
        throw new Error(error?.message)
    }
}