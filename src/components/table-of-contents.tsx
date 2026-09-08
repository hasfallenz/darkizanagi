'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/types';
import { ChevronDown, List } from 'lucide-react';

interface TOCProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 overflow-hidden">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Table of Contents ({items.length})
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpenMobile ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpenMobile && (
          <nav className="px-4 pb-4 pt-1 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-1.5 text-xs">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpenMobile(false)}
                className={`py-1 transition-colors ${
                  item.level === 3 ? 'pl-4 text-neutral-500' : 'font-medium'
                } ${
                  activeId === item.id
                    ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          On This Page
        </div>
        <nav className="flex flex-col gap-1.5 border-l border-neutral-200 dark:border-neutral-800/80 text-xs">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`-ml-px pl-3 py-1 transition-colors border-l ${
                  isActive
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-medium'
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400'
                } ${item.level === 3 ? 'pl-5 text-[11px] text-neutral-500 dark:text-neutral-500' : ''}`}
              >
                {item.title}
              </a>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
