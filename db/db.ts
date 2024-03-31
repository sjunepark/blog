import "dotenv/config";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

interface Database {}

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_ONLY_URL,
    authToken: process.env.DATABASE_ONLY_AUTH_TOKEN,
  }),
});
