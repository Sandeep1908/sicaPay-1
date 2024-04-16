import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {convertCurrencies} from "@/utils/convertCurrencies";

export const exchangeRouter = createTRPCRouter({
    convert: publicProcedure
        .input(z.object({
            from: z.string().min(3),
            to: z.string().min(3),
            amount: z.number().min(1),
        }))
        .query(async ({ input }) => {
            try {
                const {data} = await convertCurrencies(input);
                return data;
            } catch (error: any) {
                console.log(error)
            }
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.example.findMany();
    }),
});
