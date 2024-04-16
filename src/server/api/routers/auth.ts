import { z } from "zod";
import {supabase} from "@/provider/supabase";
import { createId } from '@paralleldrive/cuid2';

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
        .mutation(async ({ input }) => {
            const sb = supabase();
            const { data, error } = await sb.auth.signInWithPassword({
                email: input.email,
                password: input.password
            });

            if(error) {
                throw new TRPCError({
                    message: error?.message,
                    code: "BAD_REQUEST"
                });
            }

            await sb.auth.setSession({
                access_token: data?.session?.access_token as string,
                refresh_token: data?.session?.refresh_token as string,
            })

            return {
                session: data?.session,
                user: data,
                message: 'Login Success'
            };
        }),
    register: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(5),
            phone: z.string().min(10),
            country: z.string().min(2),
            name: z.string().min(2)
        }))
        .mutation(async ({ input }) => {
           try {
               const sb = supabase();
               const { data } = await sb.auth.signUp({
                   email: input.email,
                   password: input.password,
                   phone: input.phone,
               });

               const user = data.user;
               const {data: newUser, error} = await sb.from('User').insert([
                   {
                       id: user?.id,
                       email: input.email,
                       name: input.name,
                       country: input.country,
                       phno: input.phone,
                       updatedAt: new Date(),
                   }
               ])

               const {error: BalanceCreationError} = await sb.from('Balances').insert([
                   {
                       id: createId(),
                       userId: user?.id,
                       updatedAt: new Date(),

                   }
               ])

               await sb.from('SICA').insert([
                   {
                       id: createId(),
                       userId: user?.id,
                       updatedAt: new Date(),

                   }
               ])
               await sb.from('CARBON').insert([
                   {
                       id: createId(),
                       userId: user?.id,
                       updatedAt: new Date(),

                   }
               ])

               return {
                   session: data.session,
                   user: data?.user,
                   message: 'Register Success'
               };
           } catch (err: any) {
               throw new TRPCError({
                   code: "BAD_REQUEST",
                     message: err?.message
               })
           }
        }),
    getSession: publicProcedure
        .query(async ({input, ctx}) => {
            const sb = supabase();

            if(!ctx.access_token || !ctx.refrsh_token) {
                return {
                    message: "User logged out",
                }
            }

            const { data, error } = await sb.auth.setSession({
                access_token: ctx.access_token,
                refresh_token: ctx.refrsh_token,
            })

            if(error) {
                throw new TRPCError({
                    message: error?.message,
                    code: "UNAUTHORIZED"
                })
            }
            return data?.session
        }),
    me: publicProcedure
        .query(async ({input, ctx}) => {
            const sb = supabase();
            if(!ctx.access_token || !ctx.refrsh_token) {
                throw new TRPCError({
                    message: "Unauthorized",
                    code: "UNAUTHORIZED"
                })
            }
            const { data, error } = await sb.auth.setSession({
                access_token: ctx.access_token,
                refresh_token: ctx.refrsh_token,
            })
            if(error) {
                throw new TRPCError({
                    message: error?.message,
                    code: "UNAUTHORIZED"
                })
            }
            console.log(data)
            const { data: user, error: userError } =
                await sb
                    .from('User')
                    .select('*')
                    .eq('id', data?.session?.user?.id)
                    .single();

            console.log("user")
            console.log(user)
            console.log(userError)

            if(userError) {
                throw new TRPCError({
                    message: userError?.message,
                    code: "NOT_FOUND"
                })
            }

            return user;
        }),
    logout: publicProcedure
        .mutation(async ({input, ctx}) => {
            const sb = supabase();
            const { error } = await sb.auth.signOut();
            if(error) {
                throw new TRPCError({
                    message: error?.message,
                    code: "BAD_REQUEST"
                })
            }
            return {
                message: 'Logout Success'
            }
        })
});
