interface IUpdateComicData {
  type: string;
  series: {
    title: string;
    link: string | undefined;
  };
  chapter: {
    title: string;
    link: string | undefined;
  };
  date: string;
};

export default IUpdateComicData;