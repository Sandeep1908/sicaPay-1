import {supabase} from "@/provider/supabase";

type NEWLOG = {
    id: string,
    userId: string,
    amount: number,
    current_balance: number,
    SICA: number,
    duration: string,
    currency: string,
    updatedAt: string,
    txn_id: string,
    txn_type: string
}
export const insertLog = async (sale: NEWLOG) => {
    try {
        const sb = supabase()
        return sb.from('Logs')
            .insert(sale).single()
    } catch (error: any) {
        throw new Error(error?.message)
    }
}