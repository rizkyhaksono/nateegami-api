interface IPopularComics {
  title: string;
  image: string | undefined;
  link: string | undefined;
  chapters: {
    title: string;
    time: string;
  }
}

export default IPopularComics;