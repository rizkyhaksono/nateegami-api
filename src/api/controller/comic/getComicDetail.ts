import { createElysia } from "@/libs/elysia";
import * as cheerio from "cheerio";

interface ComicParams {
  slug: string;
}

export default createElysia()
  .get("/:slug", async ({ params }: { params: ComicParams }) => {
    const url = await fetch(`${Bun.env.BASE_URL}/manga/${params.slug}`);
    const html = await url.text();
    const $ = cheerio.load(html);

    const title = $("h1.entry-title").text().trim();
    if (!title) {
      return {
        status: 404,
        message: "Comic not found",
      }
    }

    const altTitle = $(".seriestualt").text().trim();
    const image = $(".thumb img").attr("src") ?? "";
    const description = $(".entry-content-single p").text().trim();
    const latestChapter = $(".epcurlast").text().trim();
    const latestChapterUrl = $(".epcurlast").parent().attr("href") ?? "";
    const status = $("td:contains('Status')").next().text().trim();
    const type = $("td:contains('Type')").next().text().trim();
    const released = $("td:contains('Released')").next().text().trim();
    const author = $("td:contains('Author')").next().text().trim();
    const artist = $("td:contains('Artist')").next().text().trim();
    const serialization = $("td:contains('Serialization')").next().text().trim();

    const postedBy =
      $("td:contains('Posted By') i").text().trim() ||
      $("td:contains('Posted By')").next().text().trim();
    const postedOn =
      $("td:contains('Posted On')").next().find("time").attr("datetime")?.trim() ?? "";
    const updatedOn =
      $("td:contains('Updated On')").next().find("time").attr("datetime")?.trim() ?? "";

    const genres = $(".seriestugenre a")
      .map((_, el) => $(el).text().trim())
      .get();

    const chapters = $(".eplister li").map((_, el) => {
      const chapterNumber = $(el).find(".chapternum").text().trim();
      const chapterUrl = $(el).find("a").attr("href") ?? "";
      const chapterDate = $(el).find(".chapterdate").text().trim();
      const chapterSlug = chapterUrl.split("/").filter(Boolean).pop() ?? "";

      return {
        number: chapterNumber,
        url: chapterUrl,
        slug: chapterSlug,
        date: chapterDate,
      };
    }).get();

    return {
      status: 200,
      data: {
        title,
        altTitle,
        image,
        description,
        latestChapter,
        latestChapterUrl,
        status,
        type,
        released,
        author,
        artist,
        serialization,
        postedBy,
        postedOn,
        updatedOn,
        genres,
        chapters,
      }
    };
  }, {
    detail: {
      tags: ["Comic Detail"],
      description: "Get comic detail",
    }
  })