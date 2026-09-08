'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { ArticleCard } from '@/components/article-card';
import { Search as SearchIcon, X } from 'lucide-react';

interface BlogClientProps {
  initialPosts: Post[];
}

const categories = [
  'All',
  'AI & Agent',
  'Web Development',
  'System Architecture',
  'Cloud & Infrastructure',
  'Engineering',
];

export function BlogClient({ initialPosts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      post.frontmatter.category.toLowerCase() === selectedCategory.toLowerCase() ||
      post.frontmatter.tags.some(
        (t) => t.toLowerCase() === selectedCategory.toLowerCase()
      );

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      post.frontmatter.title.toLowerCase().includes(q) ||
      post.frontmatter.description.toLowerCase().includes(q) ||
      post.frontmatter.tags.some((t) => t.toLowerCase().includes(q)) ||
      post.frontmatter.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Blog
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Things I&apos;ve built, learned, and figured out.
        </p>
      </div>

      {/* Controls: Search & Categories */}
      <div className="space-y-4 pt-2">
        {/* Search Bar */}
        <div className="relative max-w-xl w-full">
          <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by keyword or tag..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles List */}
      <div className="pt-4">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              No articles found
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Try adjusting your search query or switching categories.
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
