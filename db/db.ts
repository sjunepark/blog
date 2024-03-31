import "dotenv/config";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const DB_URL = process.env.DATABASE_URL === "dev" ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL;
export const DB_AUTH_TOKEN = process.env.DATABASE_URL === "dev" ? process.env.DATABASE_AUTH_TOKEN : undefined;

export const db = new Kysely<any>({
  dialect: new LibsqlDialect({
    url: DB_URL,
    authToken: DB_AUTH_TOKEN
  }),
});
