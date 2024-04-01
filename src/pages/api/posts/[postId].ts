export const prerender = false;

import type { APIRoute } from "astro";
import { db } from "@db/db.ts";
import type { Posts } from "kysely-codegen";
import type { Selectable } from "kysely";

type Post = Selectable<Posts>;
type PostParams = {
  postId: string;
};
export type PostResponse = {
  result?: Post;
  error?: string;
};

const createResponse = (response: PostResponse, status: number): Response => {
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET: APIRoute<never, PostParams> = async ({ params }) => {
  const postIdParam = params.postId;
  if (!postIdParam) {
    return createResponse(
      {
        error: "Missing post id",
      },
      400,
    );
  }

  const postId = parseInt(postIdParam);
  if (isNaN(postId)) {
    return createResponse(
      {
        error: "Invalid post id",
      },
      400,
    );
  }

  const result = (await db
    .selectFrom("posts")
    .where("id", "=", postId)
    .selectAll()
    .executeTakeFirst()) as Post;
  if (!result) {
    return createResponse(
      {
        error: "Post not found",
      },
      404,
    );
  }

  return createResponse(
    {
      result,
    },
    200,
  );
};
