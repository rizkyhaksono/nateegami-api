import { createElysia } from "@/libs/elysia";
import * as cheerio from "cheerio";

export default createElysia()
  .get("/", async () => {
    const url = await fetch(`${Bun.env.BASE_URL}`);
    const html = await url.text();
    const $ = cheerio.load(html);

    // Get latest comics
    const latestComics: any = [];
    $(".col-md-8 .col-xl-3").each((_, element) => {
      const title = $(element).find(".series-title").text().trim();
      const image = $(element).find(".thumb-img").attr("src");
      const chapters: any = [];

      $(element)
        .find(".series-chapter-item")
        .each((_, chapter) => {
          const chapterTitle = $(chapter).find(".series-badge").text().trim();
          const chapterTime = $(chapter).find(".series-time").text().trim();
          chapters.push({ title: chapterTitle, time: chapterTime });
        });

      latestComics.push({
        title,
        image,
        chapters,
      });
    });

    // Get popular comics
    const popularComics: any = [];
    $(".d-flex[style*='overflow-x:auto']").find(".col-6").each((_, element) => {
      const title = $(element).find(".series-title").text().trim();
      const image = $(element).find(".thumb-img").attr("src");
      const link = $(element).find(".series-link").attr("href");
      const chapters: any = [];

      $(element)
        .find(".series-chapter-item")
        .each((_, chapter) => {
          const chapterTitle = $(chapter).find(".series-badge").text().trim();
          const chapterTime = $(chapter).find(".series-time").text().trim();
          chapters.push({ title: chapterTitle, time: chapterTime });
        });

      popularComics.push({
        title,
        image,
        link,
        chapters,
      });
    });

    // Get mirror comics
    const mirrorComics: any = [];
    $(".recommendations2 .col-xl-2").each((_, element) => {
      const title = $(element).find(".series-title").text().trim();
      const image = $(element).find(".thumb-img").attr("src");
      const link = $(element).find(".series-link").attr("href");
      const chapters: any = [];

      $(element)
        .find(".series-chapter-item")
        .each((_, chapter) => {
          const chapterTitle = $(chapter).find(".series-badge").text().trim();
          const chapterTime = $(chapter).find(".series-time").text().trim();
          chapters.push({ title: chapterTitle, time: chapterTime });
        });

      mirrorComics.push({
        title,
        image,
        link,
        chapters,
      });
    });

    // Get update comics
    const updateComics = "coming soon";

    return {
      status: 200,
      data: {
        "Latest Comics": latestComics,
        "Popular Comis": popularComics,
        "Mirror Comics": mirrorComics,
        "Update Comics": updateComics,
      }
    };
  }, {
    detail: {
      tags: ["Home"]
    }
  })