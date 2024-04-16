import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {supabase} from "@/provider/supabase";
import {TRPCError} from "@trpc/server";
import {createId} from "@paralleldrive/cuid2";
import {convertCurrencies} from "@/utils/convertCurrencies";

export const withdrawRouter = createTRPCRouter({
    swap: publicProcedure
        .input(z.object({
            amount: z.number(),
            currency: z.string(),
            txn_id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const sb = supabase();
            const {data} = await sb.auth.setSession({
                access_token: ctx.access_token,
                refresh_token: ctx.refrsh_token,
            })

            // get user's balance
            const {data: balance, error: balanceError} = await sb.from('Balances')
                .select('*').eq('userId', data?.session?.user?.id).single()

            const {data: sicaBalance, error: sicaBalanceError} = await sb.from('SICA')
                .select('*').eq('userId', data?.session?.user?.id).single()


            if(!balance || !sicaBalance) {
                throw new TRPCError({
                    message: 'No balance found',
                    code: "BAD_REQUEST"
                });
            }

            const amountInUSD = input.amount * Number(process.env.SICA_PRICE_IN_USD as string);
            const amountConverted = await convertCurrencies({
                from: 'USD',
                to: input.currency,
                amount: amountInUSD
            })

            await sb.from('Balances')
                .update({
                    [input.currency]: balance[input.currency] + parseFloat(amountConverted.data.result)
                })
                .eq('userId', data?.session?.user?.id)
                .single()


            await sb.from('SICA')
                .update({
                    bonus: sicaBalance.bonus - input.amount,
                })
                .eq('userId', data?.session?.user?.id)
                .single()

            const saleId = createId();
            await sb.from('Sales')
                .insert({
                    id: saleId,
                    userId: data?.session?.user?.id,
                    amount: input.amount,
                    currency: input.currency,
                    updatedAt: new Date().toISOString(),
                    status: 'Withdrawn',
                    ref_id: `${data?.session?.user?.id}-${input.txn_id}`,
                    txn_type: 'withdraw',
                    SICA: input.amount
                })
                .single()

            await sb.from('Logs')
                .insert({
                    id: createId(),
                    userId: data?.session?.user?.id,
                    currency: input.currency,
                    txn_id: `SaleID_${saleId}`,
                    txn_type: 'Credit',
                    current_balance: balance[input.currency] + parseFloat(amountConverted.data.result),
                    amount: parseFloat(amountConverted.data.result),
                })
                .single()

            return {
                message: 'Withdrawal successful'
            };
        }),
    bank: publicProcedure
        .input(z.object({
            bank_id: z.string(),
            currency: z.string(),
            amount: z.number(),
            txn_id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            const sb = supabase();
            const {data} = await sb.auth.setSession({
                access_token: ctx.access_token,
                refresh_token: ctx.refrsh_token,
            })

            // get user's balance
            const {data: balance, error: balanceError} = await sb.from('Balances')
                .select('*').eq('userId', data?.session?.user?.id).single()

            const {data: sicaBalance, error: sicaBalanceError} = await sb.from('SICA')
                .select('*').eq('userId', data?.session?.user?.id).single()

            if(!balance || !sicaBalance) {
                throw new TRPCError({
                    message: 'No balance found',
                    code: "BAD_REQUEST"
                });
            }

            const amountInUSD = input.amount * Number(process.env.SICA_PRICE_IN_USD as string);
            const amountConverted = await convertCurrencies({
                from: 'USD',
                to: input.currency,
                amount: amountInUSD
            })

            const withdrawId = createId();
            await sb.from('Withdrawals')
                .insert({
                    id: withdrawId,
                    userId: data?.session?.user?.id,
                    currency: input.currency,
                    amount: `${amountConverted}`,
                    sica: input.amount,
                    ref_id: `${data?.session?.user?.id}-${input.txn_id}`,
                    bankAcc: input.bank_id,
                    updatedAt: new Date().toISOString(),
                })
                .single()

            await sb.from('SICA')
                .update({
                    bonus: sicaBalance.bonus - input.amount,
                })
                .eq('userId', data?.session?.user?.id)
                .single()

            await sb.from('Logs')
                .insert({
                    id: createId(),
                    userId: data?.session?.user?.id,
                    currency: input.currency,
                    txn_id: `SaleID_${withdrawId}`,
                    txn_type: 'Withdrawal',
                    current_balance: balance[input.currency],
                    amount: parseFloat(amountConverted.data.result),
                    updatedAt: new Date().toISOString(),
                })
                .single()

        })
});
