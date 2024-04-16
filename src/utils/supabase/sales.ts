import {supabase} from "@/provider/supabase";

export const getTotalSales = async () => {
    try {
        const sb = supabase()
        return sb.from('Sales')
            .select('SICA, sum(SICA)', { count: 'exact' })
            .eq('txn_type', 'sale');
    } catch (error: any) {
        throw new Error(error?.message)
    }
}

type NEWSALE = {
    id: string,
    userId: string,
    amount: number,
    SICA: number,
    duration: string,
    currency: string,
    updatedAt: string,
    status: string,
    ref_id: string
}
export const insertSale = async (sale: NEWSALE) => {
    try {
        const sb = supabase()
        return sb.from('Sales')
            .insert(sale).single()
    } catch (error: any) {
        throw new Error(error?.message)
    }
}