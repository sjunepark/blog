import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./db.ts";

export const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "./migrations",
    ),
  }),
});
