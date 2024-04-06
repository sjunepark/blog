import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(
      z.enum([
        "golang",
        "testing",
        "astro",
        "cloudflare",
        "state-management",
        "environment-variables",
        "deployment",
      ]),
    ),
    published: z.boolean(),
  }),
});

export const collections = { post: post };
