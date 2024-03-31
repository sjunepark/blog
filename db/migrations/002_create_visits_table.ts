/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  console.log("Creating visits table");
  await db.schema
    .createTable("visits")
    .addColumn("id", "integer", (col) => col.primaryKey())
    .addColumn("visitor_ip_hash", "text", (col) => col.notNull())
    .addColumn("visitor_user_agent", "text", (col) => col.notNull())
    .addColumn("visit_date", "text", (col) => col.notNull())
    .addColumn("post_id", "integer", (col) => col.notNull())
    .addForeignKeyConstraint(
      "fk_visits_posts_id",
      ["post_id"],
      "posts",
      ["id"],
      (cb) => cb.onDelete("cascade"),
    )
    .addUniqueConstraint("unique_iphash_useragent_date_postid", [
      "visitor_ip_hash",
      "visitor_user_agent",
      "visit_date",
      "post_id",
    ])
    .execute();
}

export async function down(db: Kysely<any>) {
  console.log("Dropping visits table");
  await db.schema.dropTable("visits").ifExists().execute();
}
