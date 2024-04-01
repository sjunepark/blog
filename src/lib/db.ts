import type { CollectionEntry } from "astro:content";
import { db } from "@db/db.ts";
import type { Selectable } from "kysely";
import type { Posts } from "kysely-codegen";

export const populatePosts = async (posts: CollectionEntry<"post">[]) => {
  const postCounts: Selectable<Posts>[] = [];
  for (const post of posts) {
    const postCount: Selectable<Posts> = {
      id: post.data.id,
      likes: 0,
      views: 0,
    };
    postCounts.push(postCount);
  }

  const result = await db
    .insertInto("posts")
    .values(postCounts)
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`insert result ${result}`);
};
