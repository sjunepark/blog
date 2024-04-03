import { format } from "@formkit/tempo";
import type { APIRoute } from "astro";
import type { Posts } from "kysely-codegen";
import type { Selectable } from "kysely";
import { initDB } from "@lib/db.ts";

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

export const GET: APIRoute<never, PostParams> = async ({ locals, params }) => {
  const db = await initDB(locals.dbUrl, locals.dbAuthToken);
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
  locals,
  request,
  params,
  clientAddress,
}) => {
  const db = await initDB(locals.dbUrl, locals.dbAuthToken);

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

  const userAgentHash = await hash(userAgent);
  const ipHash = await hash(ip);

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

  const insertResult = await db
    .insertInto("visits")
    .values({
      post_id: postId,
      visitor_user_agent: userAgentHash,
      visitor_ip_hash: ipHash,
      visit_date: visitDate,
    })
    .onConflict((oc) => oc.doNothing())
    .executeTakeFirst();

  if (insertResult.numInsertedOrUpdatedRows == BigInt(0)) {
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

  const updateResult = await db
    .updateTable("posts")
    .set((eb) => ({
      views: eb("views", "+", 1),
    }))
    .where("id", "=", postId)
    .executeTakeFirst();

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

  async function hash(input: string) {
    const hashBuffer = crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(input),
    );
    const hashArray = Array.from(new Uint8Array(await hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
};
