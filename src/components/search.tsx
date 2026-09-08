'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { Post } from '@/types';

interface SearchProps {
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ posts, isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const filteredPosts = query.trim() === ''
    ? posts.slice(0, 5)
    : posts.filter((post) => {
        const q = query.toLowerCase();
        const inTitle = post.frontmatter.title.toLowerCase().includes(q);
        const inDesc = post.frontmatter.description.toLowerCase().includes(q);
        const inCat = post.frontmatter.category.toLowerCase().includes(q);
        const inTags = post.frontmatter.tags.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inCat || inTags;
      });

  const handleSelect = (slug: string) => {
    handleClose();
    router.push(`/blog/${slug}`);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-100"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 gap-3">
          <SearchIcon className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, tags, or topic..."
            className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400 dark:text-neutral-500">
              No matching articles found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1.5 text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                {query.trim() === '' ? 'Recent Articles' : `Found ${filteredPosts.length} matches`}
              </div>
              {filteredPosts.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => handleSelect(post.slug)}
                  className="w-full text-left p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors flex items-start justify-between gap-4 group cursor-pointer"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                        {post.frontmatter.category}
                      </span>
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <span className="text-[11px] text-neutral-400">{post.readingTime}</span>
                    </div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {post.frontmatter.title}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {post.frontmatter.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 opacity-0 group-hover:opacity-100 transition-all shrink-0 mt-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-neutral-50 dark:bg-neutral-950/40 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Navigate with mouse or touch</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
