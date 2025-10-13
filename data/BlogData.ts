export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  contentKey: string;
  date: string;
  readTime: number;
  coverImage: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "binary-decimal-conversion-programming",
    titleKey: "binaryDecimalConversion.title",
    descriptionKey: "binaryDecimalConversion.description",
    contentKey: "binaryDecimalConversion.content",
    date: "2025-10-13",
    readTime: 5,
    coverImage: "/blog/post-1/cover.png",
    firstImage: "/blog/post-1/illustration-1.png",
    secondImage: "/blog/post-1/illustration-2.png",
    thirdImage: "/blog/post-1/illustration-3.png",
    tags: ["Programming", "Computer Science", "Backend", "Node.js"],
    author: {
      name: "Yousef Ayman",
      avatar: "/yusif.jpg",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
