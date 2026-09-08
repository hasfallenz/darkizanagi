'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, X } from 'lucide-react';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  priority?: boolean;
}

export function Figure({ src, alt, caption, credit, priority = false }: FigureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      <figure className="my-8 group">
        <div 
          onClick={() => !imgError && setIsOpen(true)}
          className={`relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-900/60 transition-all ${
            !imgError ? 'cursor-zoom-in hover:border-neutral-300 dark:hover:border-neutral-700' : ''
          }`}
        >
          {imgError ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-neutral-900 text-neutral-300">
              <span className="text-xs font-mono text-cyan-400 mb-2 font-semibold">
                [ VISUAL SPECIFICATION ]
              </span>
              <p className="text-sm font-semibold text-neutral-100">{alt}</p>
              <p className="text-xs text-neutral-400 mt-1 font-mono">{src}</p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden bg-neutral-950">
              <Image
                src={src}
                alt={alt}
                width={1902}
                height={908}
                priority={priority}
                sizes="(max-width: 768px) 100vw, 840px"
                className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.008]"
                onError={() => setImgError(true)}
              />
              <div className="absolute top-3 right-3 p-1.5 rounded-md bg-neutral-900/80 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </div>

        {(caption || credit) && (
          <figcaption className="mt-2.5 px-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
            {caption && <span>{caption}</span>}
            {credit && (
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 italic shrink-0">
                {credit}
              </span>
            )}
          </figcaption>
        )}
      </figure>

      {/* Lightweight Lightbox Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            aria-label="Close image preview"
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <div className="relative w-full max-h-[85vh] overflow-hidden rounded-lg border border-neutral-700 bg-neutral-950 flex items-center justify-center p-2">
              <Image
                src={src}
                alt={alt}
                width={1902}
                height={908}
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="w-auto h-auto max-h-[80vh] max-w-full object-contain rounded"
              />
            </div>
            {caption && (
              <p className="mt-3 text-xs sm:text-sm text-neutral-300 text-center max-w-2xl">
                {caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
