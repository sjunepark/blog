import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(({ locals }, next) => {
  const runtime = locals.runtime;

  locals.DB_URL = import.meta.env.DEV
    ? import.meta.env.DEV_DB_URL
    : runtime?.env.DB_URL || import.meta.env.DB_URL;

  locals.DB_AUTH_TOKEN = import.meta.env.DEV
    ? undefined
    : runtime?.env.DB_AUTH_TOKEN || import.meta.env.DB_AUTH_TOKEN;
  return next();
});
