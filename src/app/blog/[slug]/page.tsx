import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getRelatedPosts, extractTableOfContents } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { mdxComponents } from '@/components/mdx-components';
import { TableOfContents } from '@/components/table-of-contents';
import { ArticleCard } from '@/components/article-card';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const { frontmatter } = post;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zura-blog.vercel.app';
  const url = `${siteUrl}/blog/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author?.name || 'Zura' }],
    keywords: frontmatter.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      images: frontmatter.cover ? [{ url: `${siteUrl}${frontmatter.cover}` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.cover ? [`${siteUrl}${frontmatter.cover}`] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;
  const toc = extractTableOfContents(content);
  const relatedPosts = getRelatedPosts(slug, 2);

  // Article JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author?.name || 'darkizanagi',
    },
    publisher: {
      '@type': 'Person',
      name: 'darkizanagi',
    },
    keywords: frontmatter.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-10">
        {/* Back navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-5 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
              {frontmatter.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.25] break-words">
            {frontmatter.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(frontmatter.date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readingTime}
            </span>
            <span>•</span>
            <span>By {frontmatter.author?.name || 'darkizanagi'}</span>
          </div>
        </header>

        {/* Hero Cover Image if provided */}
        {frontmatter.cover && (
          <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 shadow-sm">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.title}
              width={1902}
              height={908}
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="w-full h-auto object-contain block"
            />
          </div>
        )}

        {/* Content Layout with Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          {/* Main Article Body - Full Width */}
          <article className="lg:col-span-9 min-w-0 w-full text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
            {/* Mobile Table of Contents */}
            <TableOfContents items={toc} />

            {/* MDX Rendered Content */}
            <div className="prose-content w-full">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Article Footer & Tags */}
            <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-8">
              {/* Tags list */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Categorized topics &amp; technologies:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shrink-0 bg-neutral-900">
                  <Image
                    src={frontmatter.author?.avatar || '/images/profile/avatar.webp'}
                    alt={frontmatter.author?.name || 'Author'}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                    {frontmatter.author?.name || 'Zura'}
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                    {frontmatter.author?.role || 'Software Engineer'}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed">
                    Building software, experimenting with agentic workflows, and documenting
                    architectural decisions.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Desktop TOC Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <TableOfContents items={toc} />
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Related Engineering Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
