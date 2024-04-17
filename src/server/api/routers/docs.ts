import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const docsRouter = createTRPCRouter({
  all: publicProcedure.input(z.object({
    q: z.string().optional(),
    filter: z.enum(["A-Z", "Z-A", "newest", "oldest", "latest"])
  })).query(async ({ ctx, input }) => {
    return await ctx.prisma.docs.findMany({
      where: {
        title: input.q ? {
          contains: input.q.toLowerCase()
        } : undefined
      }, orderBy:
        input.filter === "A-Z" ? { title: "asc" } :
          input.filter === "Z-A" ? { title: "desc" } :
            input.filter === "newest" ? { createdAt: "desc" } :
              input.filter === "oldest" ? { createdAt: "asc" } :
                { updatedAt: 'desc' }

    });
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
          title: input.title.toLowerCase(),
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
