import {TRPCError} from "@trpc/server";
import {supabase} from "@/provider/supabase";

export const getUserBalances = async (id: string) => {
    try {
        const sb = supabase()
        return sb.from('Balances')
            .select('*').eq('userId', id).single()
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

export const updateUserWalletBalance = async (id: string, currency: string, amount: number) => {
    try {
        const sb = supabase()
        return sb.from('Balances')
            .update({[currency]: amount})
            .eq('userId', id)
    } catch (error: any) {
        throw new Error(error?.message)
    }
}