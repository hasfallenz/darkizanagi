import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { BlogClient } from './blog-client';

export const metadata: Metadata = {
  title: 'Blog — Engineering Journal & Technical Notes',
  description:
    'Comprehensive technical articles, architectural decisions, and case studies on software engineering, AI agents, and systems.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogClient initialPosts={posts} />;
}
