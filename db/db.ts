/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import type { DB } from "kysely-codegen";
import "dotenv/config";

export const DB_URL =
  process.env.DEV_ENV === "true"
    ? (process.env.DEV_DATABASE_URL as string)
    : (process.env.DATABASE_URL as string);
export const DB_AUTH_TOKEN =
  process.env.DEV_ENV === "true"
    ? undefined
    : process.env.DATABASE_AUTH_TOKEN;

console.log("DEV_ENV", process.env.DEV_ENV);

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: DB_URL,
    authToken: DB_AUTH_TOKEN,
  }),
});
