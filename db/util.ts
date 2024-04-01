import type { MigrationResultSet } from "kysely";

export const logMigrationResultSet = (resultSet: MigrationResultSet) => {
  const { results, error } = resultSet;

  if (results === undefined || results.length === 0) {
    console.log("No migrations to execute");
  }

  results?.forEach((it) => {
    switch (it.status) {
      case "Success":
        console.log(
          `Migration ${it.direction} "${it.migrationName}" was executed successfully`,
        );
        break;
      case "Error":
        console.error(`Migration ${it.direction} "${it.migrationName}" failed`);
        break;
      case "NotExecuted":
        console.log(
          `Migration ${it.direction} "${it.migrationName}" was not executed`,
        );
        break;
    }
  });

  if (error) {
    console.error("Failed to migrate");
    console.error(error);
    process.exit(1);
  }
};
