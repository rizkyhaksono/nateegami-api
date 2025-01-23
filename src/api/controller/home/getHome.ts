import { createElysia } from "@/libs/elysia";
import * as cheerio from "cheerio";

import ILatestComics from "@/types/latestComics";
import IMirrorComics from "@/types/mirrorComics";
import IPopularComics from "@/types/popularComics";
import IUpdateComicData from "@/types/updateComics";

export default createElysia()
  .get("/", async () => {
    const url = await fetch(`${Bun.env.BASE_URL}`);
    const html = await url.text();
    const $ = cheerio.load(html);

    // Get latest comics
    const latestComics: ILatestComics[] = [];
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
    const popularComics: IPopularComics[] = [];
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
    const mirrorComics: IMirrorComics[] = [];
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
    const updateComics: IUpdateComicData[] = [];
    $(".feed-reaper tbody tr").each((_, element) => {
      const type = $(element)
        .find("th span")
        .text()
        .trim();
      const series = {
        title: $(element).find("td:nth-child(2) a").text().trim(),
        link: $(element).find("td:nth-child(2) a").attr("href"),
      };
      const chapter = {
        title: $(element).find("td:nth-child(3) a").text().trim(),
        link: $(element).find("td:nth-child(3) a").attr("href"),
      };
      const date = $(element).find("td:nth-child(4)").text().trim();

      updateComics.push({
        type,
        series,
        chapter,
        date,
      });
    });

    return {
      status: 200,
      data: {
        "latestComics": latestComics,
        "popularComis": popularComics,
        "mirrorComics": mirrorComics,
        "updateComics": updateComics,
      }
    };
  }, {
    detail: {
      tags: ["Home"]
    }
  })