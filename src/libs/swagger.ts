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
        name: "Comic Detail",
        description: "Nateegami Comic Detail API Documentation",
      },
    ],
  },
});