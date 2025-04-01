import { createElysia } from "@/libs/elysia";
import * as cheerio from "cheerio";

interface ChapterParams {
  slug: string;
}

export default createElysia()
  .get("/chapter/:slug", async ({ params }: { params: ChapterParams }) => {
    const url = await fetch(`${Bun.env.BASE_URL}/${params.slug}`);
    const html = await url.text();

    const $ = cheerio.load(html);

    const noscriptContent = $("noscript").text();
    const image = noscriptContent.match(/src="([^"]+)"/g)
      ?.map((src) => src.replace('src="', '').replace('"', ''))
      .filter((src) => src.startsWith('https://r2.uqni.net')) ?? [];

    if (image.length === 0) {
      return {
        status: 404,
        message: "Chapter not found",
      }
    }

    return {
      status: 200,
      data: {
        image,
      }
    };
  }, {
    detail: {
      tags: ["Comic Detail"],
      description: "Get comic chapter",
    }
  });
