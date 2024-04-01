import { format } from "@formkit/tempo";
import type { APIRoute } from "astro";
import type { Posts } from "kysely-codegen";
import type { Selectable } from "kysely";
import crypto from "node:crypto";

import { db } from "@db/db.ts";

export const prerender = false;

type Post = Selectable<Posts>;
type PostParams = {
  postId: string;
};

export type PostsGetResponse = {
  result?: Post;
  error?: string;
};

export type PostsPostResponse = {
  error: boolean;
  message: string;
  result: {
    inserted: boolean;
  };
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

export const POST: APIRoute<never, PostParams> = async ({
  request,
  params,
  clientAddress,
}) => {
  const postIdParam = params.postId;
  if (!postIdParam) {
    return createPostResponse(
      {
        error: true,
        message: "Missing post id",
        result: {
          inserted: false,
        },
      },
      400,
    );
  }

  const postId = parseInt(postIdParam);
  if (isNaN(postId)) {
    return createPostResponse(
      {
        error: true,
        message: "Invalid post id",
        result: {
          inserted: false,
        },
      },
      400,
    );
  }

  const userAgent = request.headers.get("user-agent") || "";
  const ip = clientAddress;
  const visitDate = format(new Date(), "YYYY-MM-DD", "en");

  const userAgentHash = hash(userAgent);
  const ipHash = hash(ip);

  const visitResult = await db
    .selectFrom("visits")
    .where("post_id", "=", postId)
    .where("visitor_user_agent", "=", userAgentHash)
    .where("visitor_ip_hash", "=", ipHash)
    .where("visit_date", "=", visitDate)
    .select("id")
    .execute();

  const visitId = visitResult[0]?.id;

  if (visitId) {
    return createPostResponse(
      {
        error: false,
        message: "Visit already exists",
        result: {
          inserted: false,
        },
      },
      200,
    );
  }

  const updateResult = await db.transaction().execute(async (trx) => {
    const postIds = await trx
      .insertInto("visits")
      .values({
        post_id: postId,
        visitor_user_agent: userAgentHash,
        visitor_ip_hash: ipHash,
        visit_date: visitDate,
      })
      .returning("post_id")
      .execute();

    return await trx
      .updateTable("posts")
      .set((eb) => ({
        views: eb("views", "+", 1),
      }))
      .where("id", "=", postIds[0].post_id)
      .executeTakeFirst();
  });

  if (updateResult.numUpdatedRows == BigInt(0)) {
    return createPostResponse(
      {
        error: true,
        message: "Update failed",
        result: {
          inserted: false,
        },
      },
      400,
    );
  }
  return createPostResponse(
    {
      error: false,
      message: "Visit incremented successfully",
      result: {
        inserted: true,
      },
    },
    201,
  );

  function hash(input: string) {
    return crypto.createHash("sha256").update(input).digest("hex");
  }
};
