import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {supabase} from "@/provider/supabase";
import {TRPCError} from "@trpc/server";

export const dashboardRouter = createTRPCRouter({
    getPortfolioSummaries: publicProcedure
        .query(async ({ input, ctx }) => {
            try {
                const sb = supabase();
                const { data } = await sb.auth.setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token,
                })

                const {data: fiat, error} = await sb.from('Balances')
                    .select('*').eq('userId', data?.session?.user?.id).single()
                const {data: sica} = await sb.from('SICA')
                    .select('*').eq('userId', data?.session?.user?.id).single()
                const {data: carbon} = await sb.from('CARBON')
                    .select('*').eq('userId', data?.session?.user?.id).single()

                return {
                    fiat,
                    sica,
                    carbon
                };
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        })
});
