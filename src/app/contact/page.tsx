import { Metadata } from 'next';
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: 'Contact — Connect & Discussions',
  description:
    'Get in touch for discussions on software engineering, system architecture, or AI agent implementations.',
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: 'Email',
      handle: 'developer@example.com',
      description: 'Best for in-depth technical inquiries, collaborations, and discussions.',
      href: 'mailto:developer@example.com',
      icon: Mail,
      action: 'Send Email',
    },
    {
      title: 'GitHub',
      handle: 'github.com/developer-placeholder',
      description: 'Explore code repositories, open-source projects, and technical experiments.',
      href: 'https://github.com',
      icon: GithubIcon,
      action: 'View Profile',
    },
    {
      title: 'LinkedIn',
      handle: 'linkedin.com/in/developer-placeholder',
      description: 'Professional networking and technical career updates.',
      href: 'https://linkedin.com',
      icon: LinkedinIcon,
      action: 'Connect',
    },
    {
      title: 'X / Twitter',
      handle: '@developer_handle',
      description: 'Casual thoughts on developer tooling, system design, and AI advancements.',
      href: 'https://x.com',
      icon: MessageSquare,
      action: 'Follow',
    },
  ];

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Contact
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I&apos;m always open to discussing system architecture, AI agent implementations,
          security guardrails, or interesting software engineering problems.
        </p>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {contactChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.title}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 flex items-center justify-center group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">
                  {channel.title}
                </div>
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 truncate">
                  {channel.handle}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                  {channel.description}
                </p>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                {channel.action} &rarr;
              </div>
            </a>
          );
        })}
      </div>

      {/* Direct Notice */}
      <div className="p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/40 bg-neutral-50/50 dark:bg-neutral-900/20 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        <span className="font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
          Note:
        </span>{' '}
        Social and email links above are placeholders designed for easy replacement in{' '}
        <code className="font-mono px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-cyan-600 dark:text-cyan-300">
          src/app/contact/page.tsx
        </code>.
      </div>
    </div>
  );
}
