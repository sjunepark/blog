import type { CollectionEntry } from "astro:content";
import {Kysely, type Selectable} from "kysely";
import type {DB, Posts} from "kysely-codegen";
import {LibsqlDialect} from "@libsql/kysely-libsql";

export const DB_URL =
    import.meta.env.DEV_ENV === "true"
        ? (import.meta.env.DEV_DATABASE_URL as string)
        : (import.meta.env.DATABASE_URL as string);
export const DB_AUTH_TOKEN =
    import.meta.env.DEV_ENV === "true"
        ? undefined
        : import.meta.env.DATABASE_AUTH_TOKEN;

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: DB_URL,
    authToken: DB_AUTH_TOKEN,
  }),
});


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

  const numInsertedOrUpdatedRows = result[0].numInsertedOrUpdatedRows;
  console.log(
    `Inserted or updated ${numInsertedOrUpdatedRows} rows during post population`,
  );
};
