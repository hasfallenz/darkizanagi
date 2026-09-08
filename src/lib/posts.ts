import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostFrontmatter, TableOfContentsItem } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const readTime = readingTime(content).text;

    const frontmatter = data as PostFrontmatter;

    return {
      slug,
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || '',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        category: frontmatter.category || 'General',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        featured: Boolean(frontmatter.featured),
        cover: frontmatter.cover || '/images/havenso/panelcustomer.png',
        author: frontmatter.author || {
          name: 'darkizanagi',
          role: 'Software Engineer',
          avatar: '/images/profile/avatar.webp',
        },
      },
      readingTime: readTime,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.frontmatter.featured) || posts[0] || null;
}

export function getRelatedPosts(currentSlug: string, limit = 2): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  
  // Rank by shared tags or category
  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.frontmatter.category === current.frontmatter.category) score += 2;
    const commonTags = post.frontmatter.tags.filter((t) =>
      current.frontmatter.tags.includes(t)
    );
    score += commonTags.length;
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((item) => item.post);
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    // generate clean slug id
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
}
