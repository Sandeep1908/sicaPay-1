import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {supabase} from "@/provider/supabase";
import {TRPCError} from "@trpc/server";
import { createId } from '@paralleldrive/cuid2';

export const userRouter = createTRPCRouter({
    getAccountActivity: publicProcedure
        .query(async ({ input, ctx }) => {
            try {
                const sb = supabase();
                const { data } = await sb.auth.setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token,
                })

                const {data: activities, error} = await sb.from('Logs')
                    .select('*').eq('userId', data?.session?.user?.id)

                return {
                    activities,
                };
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
    getBankAccounts: publicProcedure
        .query(async ({ input, ctx }) => {
            try {
                const sb = supabase();
                const { data } = await sb.auth.setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token,
                })

                const {data: accounts} = await sb.from('BankAccount')
                    .select('*').eq('userId', data?.session?.user?.id)

                return {
                    accounts,
                };
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
    addBankAccount: publicProcedure
        .input(z.object({
            bank: z.string(),
            name: z.string(),
            acc_number: z.string(),
            ifsc: z.string(),
            address: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const sb = supabase();
                const { data } = await sb.auth.setSession({
                    access_token: ctx.access_token,
                    refresh_token: ctx.refrsh_token,
                })

                const {data: accounts, error} = await sb.from('BankAccount')
                    .insert([
                        {
                            userId: data?.session?.user?.id,
                            bank: input.bank,
                            name: input.name,
                            account: input.acc_number,
                            ifsc: input.ifsc,
                            address: input.address,
                            id: createId(),
                            updatedAt: new Date(),
                        }
                    ])

                console.log(error)

                return {
                    accounts,
                };
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        }),
    deleteBankAccount: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const sb = supabase();

                const {data: accounts, error} = await sb.from('BankAccount')
                    .delete().eq('id', input.id)

                return {
                    accounts,
                };
            } catch (error: any) {
                throw new TRPCError({
                    message: error?.message,
                    code: "INTERNAL_SERVER_ERROR"
                })
            }
        })
});
