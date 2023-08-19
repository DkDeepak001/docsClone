import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { docsRouter } from "./routers/docs";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  docs: docsRouter,
});

export type AppRouter = typeof appRouter;
