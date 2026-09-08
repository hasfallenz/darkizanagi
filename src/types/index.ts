export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  cover?: string;
  author?: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
  content: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface ProjectItem {
  title: string;
  slug?: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  caseStudyHref?: string;
  featured?: boolean;
  status?: string;
}
