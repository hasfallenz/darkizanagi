import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects — Technical Case Studies & Software Systems',
  description:
    'Documented software systems, multi-panel web applications, and autonomous AI agents built with production-grade engineering principles.',
};

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Havenso Cafe',
      category: 'Full-Stack • AI Agent • System Architecture • F&B Technology',
      status: 'Production Architecture',
      description:
        'Sistem operasional kafe terintegrasi berbasis web multi-panel yang menghubungkan customer ordering, kitchen workflow, inventory management, management analytics, dan owner command center melalui Hermes AI Agent.',
      image: '/images/havenso/panelcustomer.png',
      caseStudyHref: '/blog/membangun-havenso-cafe',
      tech: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'SQLite',
        'Prisma',
        'Hermes AI',
        'Groq',
        'Cloud VPS',
        'PM2',
        'Nginx',
      ],
      highlights: [
        '5 Specialized Actor Panels: Customer, Kitchen KDS, Staff, Management, Owner',
        'Hermes AI Agent with Ground-Truth DB Access & Tool Calling',
        'Defense-in-Depth Security with RBAC, Audit Logging & Guardrails',
        'Deterministic Fallback Engine for high-availability operational uptime',
      ],
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2 sm:space-y-3 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
          Production systems, autonomous agents, and software architecture experiments.
          Each project represents an intentional solution to concrete operational problems.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6 sm:space-y-8 pt-1 sm:pt-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden group hover:border-cyan-500/40 transition-all shadow-sm"
          >
            {/* Visual Cover - Uncropped Native Aspect Ratio */}
            <div className="relative w-full bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={1902}
                height={908}
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="w-full h-auto object-contain block group-hover:scale-[1.008] transition-transform duration-500"
              />
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 break-words leading-relaxed">
                  {project.category}
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Key Architectural Features
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-mono mt-0.5">&bull;</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <div className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link
                  href={project.caseStudyHref}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
