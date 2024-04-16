import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {TRPCError} from "@trpc/server";
import {supabase} from "@/provider/supabase";
import {createId} from "@paralleldrive/cuid2";
import {SubscriptionDuration, subscriptionObject} from "@/utils/subscriptionObject";
import {convertCurrencies} from "@/utils/convertCurrencies";
import {setSession} from "@/utils/supabase/auth";
import {getUserBalances, updateUserWalletBalance} from "@/utils/supabase/balance";
import {getTotalSales, insertSale} from "@/utils/supabase/sales";
import {getSICABalance, updateBonusSICABalance, updateStakedSICABalance} from "@/utils/supabase/SICA";
import {insertLog} from "@/utils/supabase/logs";

export const salesRouter = createTRPCRouter({
    getSales: publicProcedure
        .query(async ({ input }) => {
            try {
                const { data: totalSales } = await getTotalSales()
                return {
                    totalSales
                }
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
    buySICA: publicProcedure
        .input(z.object({
            amount: z.number().min(100),
            currency: z.string().min(3),
            txn_id: z.string().min(5),
            duration: z.string().min(3),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const {data} = await setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token
                });

                const SICA_PRICE = subscriptionObject[input.duration as SubscriptionDuration] as number;;

                // get user's balance
                const {data: balance} = await getUserBalances(data?.session?.user?.id as string)


                // get total sales by summing all sales
                const {data: totalSales} = await getTotalSales()

                if(!balance) {
                    throw new TRPCError({
                        message: 'No balance found',
                        code: "BAD_REQUEST"
                    });
                }

                if(balance && balance[input.currency] < input.amount) {
                    throw new TRPCError({
                        message: 'Insufficient Balance',
                        code: "BAD_REQUEST"
                    });
                }

                if(totalSales &&
                    (totalSales.reduce((acc, cur) => acc + cur.SICA, 0) + input.amount) >= 10_000_000
                ) {
                    throw new TRPCError({
                        message: 'The current amount would exceed the maximum amount of SICA that are available.',
                        code: "BAD_REQUEST"
                    });
                }

                // update user's balance
                await updateUserWalletBalance(
                    data?.session?.user?.id as string,
                    input.currency,
                    balance[input.currency] - input.amount,
                )

                const amountInUSD = await convertCurrencies({
                    from: input.currency,
                    to: 'USD',
                    amount: input.amount,
                })

                const SICAToBePurchases = amountInUSD.data.amount / SICA_PRICE;

                const {data: SICABal} = await getSICABalance(data?.session?.user?.id as string)
                await updateStakedSICABalance(
                    data?.session?.user?.id as string,
                    SICABal ? SICABal?.staked + SICAToBePurchases : SICAToBePurchases
                )

                const saleID = createId()

                await insertSale({
                    id: saleID,
                    userId: data?.session?.user?.id as string,
                    amount: input.amount,
                    SICA: SICAToBePurchases,
                    duration: input.duration,
                    currency: input.currency,
                    updatedAt: new Date().toISOString(),
                    status: 'Purchased',
                    ref_id: `${data?.session?.user?.id}-${input.txn_id}`
                })

                await insertLog({
                    id: createId(),
                    userId: data?.session?.user?.id as string,
                    updatedAt: new Date().toISOString(),
                    currency: input.currency,
                    txn_id: saleID,
                    txn_type: 'DEBIT',
                    amount: input.amount,
                    SICA: SICAToBePurchases,
                    duration: input.duration,
                    current_balance: balance[input.currency] - input.amount,
                })

                return {
                    message: 'Purchase Success'
                }
            } catch (error: any) {
                console.log('error', error)
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
    stakeBonusSICA: publicProcedure
        .input(z.object({
            amount: z.number().min(100),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const {data} = await setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token
                });

                const {data: SICABal} = await getSICABalance(data?.session?.user?.id as string)

                if(SICABal?.bonus < input.amount) {
                    throw new TRPCError({
                        message: 'Insufficient Balance',
                        code: "BAD_REQUEST"
                    });
                }
                await updateStakedSICABalance(
                    data?.session?.user?.id as string,
                    SICABal?.staked + input.amount,
                )

                await updateBonusSICABalance(
                    data?.session?.user?.id as string,
                    SICABal?.bonus - input.amount,
                )

                return {
                    message: 'Stake Success'
                }
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        })
});
