import { createElysia } from "@/libs/elysia";
import getHome from "./controller/home";

const apiRoutes = createElysia()
  .group("home", (api) =>
    api
      .use(getHome)
  );

export default apiRoutes;