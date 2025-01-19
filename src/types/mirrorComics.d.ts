interface IMirrorComics {
  title: string;
  image: string | undefined;
  link: string | undefined;
  chapters: {
    title: string;
    time: string;
  }
};

export default IMirrorComics;