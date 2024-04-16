import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {supabase} from "@/provider/supabase";
import {createId} from "@paralleldrive/cuid2";

export const depositRouter = createTRPCRouter({
    deposit: publicProcedure
        .input(z.object({
            currency: z.string().min(3),
            txn_id: z.string().min(5),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const sb = supabase();
                const { data } = await sb.auth.setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token,
                })

                const {data: deposit, error} = await sb.from('Deposits').insert([
                    {
                        id: createId(),
                        userId: data?.session?.user?.id,
                        currency: input.currency,
                        txn_id: input.txn_id,
                        status: 'Pending Approval',
                        updatedAt: new Date(),
                        ref_id: `${data?.session?.user?.id}-${input.txn_id}`
                    }
                ])

                if(error) {
                    throw new TRPCError({
                        message: error?.message,
                        code: "BAD_REQUEST"
                    });
                }

                return {
                    message: 'Deposit Success'
                }
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
});
