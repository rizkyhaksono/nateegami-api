import { createElysia } from "@/libs/elysia";
import cors from "@elysiajs/cors";
import apiRoutes from "@/api";
import { docs } from "@/libs/swagger";

const app = createElysia()
  .use(cors({
    origin: [
      "http://localhost:3000",
      "https://otakudesu.natee.my.id",
      "https://natee.me",
      "localhost:3000",
      "otakudesu.natee.my.id",
      "natee.me",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(docs)
  .use(apiRoutes)
  .get("/", () => "Hello Nateegami API")
  .listen(Bun.env.PORT ?? 3031);

console.log(
  `🦊 nateegami is running at ${Bun.env.NODE_ENV === "development" ? "http://" : "https://"}${app.server?.hostname}:${app.server?.port}`
);
