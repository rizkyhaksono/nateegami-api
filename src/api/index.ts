import { createElysia } from "@/libs/elysia";
import getHome from "./controller/home";
import {
  getComicDetail,
  getComicChapter
} from "./controller/comic";

const apiRoutes = createElysia()
  .group("home", (api) =>
    api
      .use(getHome)
  )
  .group("comic", (api) =>
    api
      .use(getComicDetail)
      .use(getComicChapter)
  )

export default apiRoutes;