import swagger from "@elysiajs/swagger";

export const docs = swagger({
  documentation: {
    info: {
      title: "Nateegami API Documentation",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Home",
        description: "Nateegami Home API Documentation"
      },
      {
        name: "Project",
        description: "Nateegami Project API Documentation",
      },
      {
        name: "Mirror",
        description: "Nateegami Mirror API Documentation",
      },
      {
        name: "Trending",
        description: "Nateegami Trending API Documentation",
      },
    ],
  },
});