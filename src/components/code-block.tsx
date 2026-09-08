'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === 'string' ? children : String(children || '');
  const language = className ? className.replace(/language-/, '') : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-950/60 text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-[11px] uppercase tracking-wider font-semibold">
            {language || 'text'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}
