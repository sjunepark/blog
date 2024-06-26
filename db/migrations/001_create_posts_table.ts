/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  console.log("Creating posts table");
  await db.schema
    .createTable("posts")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("views", "integer", (col) => col.defaultTo(0))
    .addColumn("likes", "integer", (col) => col.defaultTo(0))
    .execute();
}

export async function down(db: Kysely<any>) {
  console.log("Dropping posts table");
  await db.schema.dropTable("posts").ifExists().execute();
}
