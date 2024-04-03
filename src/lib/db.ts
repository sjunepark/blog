import { Kysely } from "kysely";
import type { DB } from "kysely-codegen";
import { LibsqlDialect } from "@libsql/kysely-libsql";

export const initDB = async (dbUrl: string, dbAuthToken?: string) => {
  return new Kysely<DB>({
    dialect: new LibsqlDialect({
      url: dbUrl,
      authToken: dbAuthToken,
    }),
  });
};
