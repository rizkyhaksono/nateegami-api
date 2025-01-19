import { Elysia } from "elysia";
import { z } from "zod";

const envValidateScheme = z.object({
  NODE_ENV: z.string(),
  DOMAIN: z.string(),
  PORT: z.string(),
  BASE_URL: z.string(),
});

const env = () => {
  const app = new Elysia({
    name: "env",
  });

  const env = envValidateScheme.parse(Bun.env);

  return app.decorate("env", {
    ...env,
    env: Bun.env,
  });
};

export { env };