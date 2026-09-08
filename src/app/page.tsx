import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import { ArticleCard } from '@/components/article-card';
import { HomeContactForm } from '@/components/home-contact-form';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Top Banner & Hero Header Group */}
      <div className="space-y-8 sm:space-y-10">
        <section className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-950 shadow-sm">
          <Image
            src="/bg-web-blog.png"
            alt="darkizanagi Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </section>

        {/* Hero Content Section (Centered) */}
        <section className="w-full space-y-6 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.15]">
            Building things.<br />
            Breaking things.<br />
            <span className="text-cyan-600 dark:text-cyan-400">Learning from them.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Personal engineering journal where I document software projects, AI experiments,
            system architecture, and things I&apos;m learning along the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-xs sm:max-w-none">
            <Link
              href="/blog"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
            >
              <span>Read the Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-center shadow-sm active:scale-[0.98]"
            >
              View Projects
            </Link>
          </div>
        </section>
      </div>

      {/* Featured Project Showcase: Havenso Cafe */}
      <section>
        <div className="rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Project Details */}
            <div className="lg:col-span-6 p-5 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Havenso Cafe
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                  Ekosistem operasional F&amp;B modern berbasis web multi-panel yang menghubungkan customer,
                  kitchen, staff, management, dan owner dalam satu sistem terintegrasi dengan Hermes AI Agent.
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {[
                    'Next.js',
                    'TypeScript',
                    'SQLite',
                    'Prisma',
                    'AI Agent',
                    'Hermes AI',
                    'Cloud VPS',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/blog/membangun-havenso-cafe"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/projects"
                  className="text-xs font-mono text-center sm:text-left text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-1"
                >
                  Architecture Overview &rarr;
                </Link>
              </div>
            </div>

            {/* Visual Preview - Uncropped Native Aspect Ratio */}
            <div className="lg:col-span-6 relative bg-neutral-50/50 dark:bg-neutral-900/30 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 p-3 sm:p-6 flex flex-col justify-center items-center">
              <div className="relative w-full overflow-hidden rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-950 shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                  src="/images/havenso/panelcustomer.png"
                  alt="Havenso Cafe Customer Panel Preview"
                  width={1902}
                  height={908}
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] sm:text-[11px] font-mono text-neutral-300">
                  Customer Ordering Panel
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} featured={post.frontmatter.featured} />
          ))}
        </div>
      </section>

      {/* Direct Contact Form (WhatsApp Redirect) */}
      <HomeContactForm />
    </div>
  );
}
