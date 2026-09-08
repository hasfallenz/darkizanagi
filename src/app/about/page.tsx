import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About — Engineering Philosophy & Background',
  description:
    "Personal engineering journal where I document software projects, AI experiments, system architecture, and things I'm learning along the way.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 w-full max-w-4xl">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-900 shrink-0">
          <Image
            src="/images/profile/avatar.webp"
            alt="darkizanagi"
            fill
            sizes="80px"
            priority
            className="object-cover"
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            I&apos;m a developer who likes building things.
          </h1>
          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            Software Engineer • Systems &amp; Agentic AI
          </p>
        </div>
      </div>

      {/* Brief Statement */}
      <div className="space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <p>
          This blog is my engineering journal — a place where I document projects,
          experiments, technical decisions, and lessons learned while building software.
        </p>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          I believe that the best way to understand complex systems is to construct them
          from scratch: analyzing requirements, designing resilient schemas, testing authorization
          boundaries, and putting them into production where real users and real edge cases exist.
        </p>
      </div>
    </div>
  );
}
