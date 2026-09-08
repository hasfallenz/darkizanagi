import React from 'react';
import Link from 'next/link';
import { Figure } from './figure';
import { CodeBlock } from './code-block';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'note' | 'tip' | 'warning' | 'info';
  children: React.ReactNode;
}

export function Callout({ type = 'note', children }: CalloutProps) {
  const styles = {
    note: {
      border: 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200',
      icon: <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />,
      label: 'NOTE',
    },
    tip: {
      border: 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
      icon: <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />,
      label: 'TIP',
    },
    warning: {
      border: 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />,
      label: 'IMPORTANT',
    },
    info: {
      border: 'border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/20 text-cyan-900 dark:text-cyan-200',
      icon: <Info className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />,
      label: 'INFO',
    },
  }[type];

  return (
    <div className={`my-6 p-4 rounded-lg border flex gap-3 text-sm leading-relaxed ${styles.border}`}>
      {styles.icon}
      <div className="flex-1 space-y-1">
        <div className="font-mono text-[11px] font-bold uppercase tracking-wider opacity-80">
          {styles.label}
        </div>
        <div className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function generateId(text: React.ReactNode): string {
  const str = typeof text === 'string' ? text : React.Children.toArray(text).join('');
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export const mdxComponents = {
  Figure,
  Callout,
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-12 mb-4 scroll-mt-24"
      id={generateId(children)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-10 mb-4 pb-2 border-b border-neutral-200/60 dark:border-neutral-800/60 scroll-mt-24"
      id={generateId(children)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mt-8 mb-3 scroll-mt-24"
      id={generateId(children)}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-base text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-base text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 pl-4 border-l-2 border-cyan-500 italic text-neutral-600 dark:text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/20 py-2 pr-4 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-neutral-200 dark:border-neutral-800" {...props} />
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (!className) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-cyan-700 dark:text-cyan-300 font-mono text-sm border border-neutral-200 dark:border-neutral-800"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    );
  },
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
    return <>{children}</>;
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-medium text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider font-mono text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 border-b border-neutral-200/60 dark:border-neutral-800/60 text-neutral-600 dark:text-neutral-400 font-sans" {...props}>
      {children}
    </td>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#');
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="text-cyan-600 dark:text-cyan-400 underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-500 font-medium"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-600 dark:text-cyan-400 underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-500 font-medium"
        {...props}
      >
        {children}
      </a>
    );
  },
};
