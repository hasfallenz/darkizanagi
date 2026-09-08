import Link from 'next/link';
import { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';

interface ArticleCardProps {
  post: Post;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border transition-all ${
        featured
          ? 'p-4 sm:p-6 md:p-8 bg-neutral-50/70 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800/90 hover:border-cyan-500/40'
          : 'p-4 sm:p-6 bg-white dark:bg-neutral-950 border-neutral-200/90 dark:border-neutral-800/60 hover:border-neutral-300 dark:hover:border-neutral-700'
      }`}
    >
      <div>
        {/* Meta */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-mono mb-2.5 sm:mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(frontmatter.date)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight ${
            featured ? 'text-base sm:text-xl md:text-2xl leading-snug mb-2.5 sm:mb-3' : 'text-base sm:text-lg mb-2'
          }`}
        >
          <Link href={`/blog/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p
          className={`text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed ${
            featured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
          }`}
        >
          {frontmatter.description}
        </p>
      </div>

      {/* Tags & Action Link */}
      <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/50 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {frontmatter.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800/60"
            >
              #{tag}
            </span>
          ))}
          {frontmatter.tags.length > 4 && (
            <span className="text-[10px] font-mono text-neutral-400 self-center">
              +{frontmatter.tags.length - 4}
            </span>
          )}
        </div>

        <div className="inline-flex items-center gap-1 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0">
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
}
