import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const docsRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.docs.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.docs.create({
        data: {
          title: input.title,
          content: "",
        },
      });
    }),
  save: publicProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.docs.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });
    }),
});
