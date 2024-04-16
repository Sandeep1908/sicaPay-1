import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { authRouter } from "@/server/api/routers/auth";
import { dashboardRouter } from "@/server/api/routers/dashboard";
import { userRouter } from "@/server/api/routers/user";
import { salesRouter } from "@/server/api/routers/sales";
import { depositRouter } from "@/server/api/routers/deposit";
import { withdrawRouter } from "@/server/api/routers/withdraw";
import { exchangeRouter } from "@/server/api/routers/exchange";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  dashboard: dashboardRouter,
  user: userRouter,
  sales: salesRouter,
  deposit: depositRouter,
  withdraw: withdrawRouter,
  exchange: exchangeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
