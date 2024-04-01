import { migrator } from "../migrator.ts";
import { logMigrationResultSet } from "../util.ts";

const migrationResultSet = await migrator.migrateUp();

logMigrationResultSet(migrationResultSet);
