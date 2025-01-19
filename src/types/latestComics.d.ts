interface ILatestComics {
  title: string;
  image: string | undefined;
  chapters: {
    title: string;
    time: string;
  }
};

export default ILatestComics;