export type Post = {
  id?: string;
  slug?: string;
  title?: string;
  color?: string;
  content: string;
  tag?: string[];
  date?: string;
  description?: string;
  metadata: {
    [key: string]: any;
  };
};

export type PostsByMonth = {
  [key: string]: Post[];
};
