/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import type { DB } from "kysely-codegen";

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
