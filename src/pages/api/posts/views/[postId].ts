export const prerender = false;

import type { APIRoute } from "astro";
import { db } from "@db/db.ts";
import type { Posts } from "kysely-codegen";
import type { Selectable } from "kysely";

type Post = Selectable<Posts>;
type PostParams = {
  postId: string;
};

export type PostsGetResponse = {
  result?: Post;
  error?: string;
};

export type PostsPostResponse = {
  result?: {
    id: number;
  };
  error?: string;
};

const createGetResponse = (
  response: PostsGetResponse,
  status: number,
): Response => {
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createPostResponse = (
  response: PostsPostResponse,
  status: number,
): Response => {
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
    return createGetResponse(
      {
        error: "Missing post id",
      },
      400,
    );
  }

  const postId = parseInt(postIdParam);
  if (isNaN(postId)) {
    return createGetResponse(
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
    return createGetResponse(
      {
        error: "Post not found",
      },
      404,
    );
  }

  return createGetResponse(
    {
      result,
    },
    200,
  );
};

export const POST: APIRoute<never, PostParams> = async ({ params }) => {
  const postIdParam = params.postId;
  if (!postIdParam) {
    return createPostResponse(
      {
        error: "Missing post id",
      },
      400,
    );
  }

  const postId = parseInt(postIdParam);
  if (isNaN(postId)) {
    return createPostResponse(
      {
        error: "Invalid post id",
      },
      400,
    );
  }

  const result = await db
    .updateTable("posts")
    .set((eb) => ({
      views: eb("views", "+", 1),
    }))
    .where("id", "=", postId)
    .executeTakeFirst();

  if (result.numUpdatedRows > 0) {
    return createPostResponse(
      {
        result: {
          id: postId,
        },
      },
      200,
    );
  }

  return createPostResponse(
    {
      error: "Update failed",
    },
    400,
  );
};
