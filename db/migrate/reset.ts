import { migrator } from "../migrator.ts";
import { logMigrationResultSet } from "../util.ts";
import { NO_MIGRATIONS } from "kysely";

const migrationResultSet = await migrator.migrateTo(NO_MIGRATIONS);

logMigrationResultSet(migrationResultSet);
