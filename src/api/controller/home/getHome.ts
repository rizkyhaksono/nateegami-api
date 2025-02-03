import { createElysia } from "@/libs/elysia";
import * as cheerio from "cheerio";

export default createElysia()
  .get("/", async () => {
    const url = await fetch(`${Bun.env.BASE_URL}`);
    const html = await url.text();
    const $ = cheerio.load(html);

    const extractSlug = (url: string | undefined) => {
      if (!url) return null;
      const regex = /\/manga\/([^/]+)\/|\/([^/]+-chapter-\d+)\//;
      const matches = regex.exec(url);
      return matches ? matches[2] || matches[1] : null;
    };

    const popularComics = $(".listupd.popularslider .bsx").map((_, el) => {
      const element = $(el);
      const link = element.find("a").attr("href");

      return {
        title: element.find(".tt").text().trim(),
        link,
        slug: extractSlug(link),
        image: element.find("img").attr("src"),
        chapter: element.find(".epxs").text().trim(),
        rating: element.find(".numscore").text().trim(),
      };
    }).get();

    const latestComics = $(".listupd .bsx")
      .map((_, el) => {
        const element = $(el);
        const link = element.find(".tt a").attr("href");

        const chapters = element
          .find(".chfiv li")
          .map((_, ch) => {
            const chapterLink = $(ch).find("a").attr("href");

            return {
              chapter: $(ch).find("a").text().trim(),
              link: chapterLink,
              slug: extractSlug(chapterLink),  // Extract the slug here
              time: $(ch).find(".fivtime").text().trim(),
            };
          })
          .get();

        return chapters.length > 0
          ? {
            title: element.find(".tt a").text().trim(),
            link,
            slug: extractSlug(link),
            image: element.find("img").attr("src"),
            chapters,
          }
          : null;
      })
      .get()
      .filter(Boolean);

    return {
      status: 200,
      data: {
        popularComics: popularComics,
        latestComics: latestComics,
      }
    };
  }, {
    detail: {
      tags: ["Home"]
    }
  });
