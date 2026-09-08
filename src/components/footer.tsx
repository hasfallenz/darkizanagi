export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-neutral-300 border-t border-neutral-900 mt-16 sm:mt-20 py-10 sm:py-12 transition-colors">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-sm">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-white tracking-tight text-base">darkizanagi</span>
          <span className="text-xs text-neutral-400">&copy; {currentYear} darkizanagi. All rights reserved.</span>
        </div>

        {/* Stacked Vertical Contact List */}
        <div className="flex flex-col gap-3">
          {/* Instagram */}
          <a
            href="https://instagram.com/nextsantaa"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 shrink-0 rounded-[5px] transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="ig-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="25%" stopColor="#f37335" />
                  <stop offset="50%" stopColor="#fd1d1d" />
                  <stop offset="75%" stopColor="#d6249f" />
                  <stop offset="100%" stopColor="#285AEB" />
                </linearGradient>
              </defs>
              <rect width="24" height="24" rx="6" fill="url(#ig-gradient-footer)" />
              <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.8" stroke="#ffffff" strokeWidth="1.6" fill="none" />
              <circle cx="12" cy="12" r="3.3" stroke="#ffffff" strokeWidth="1.6" fill="none" />
              <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
            </svg>
            <span className="text-xs sm:text-sm font-medium">nextsantaa</span>
          </a>

          {/* Email */}
          <a
            href="mailto:hasfallenz12@gmail.com"
            className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 48 48" fill="none">
              <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
              <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
              <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
              <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L8.68,7.96C7.037,6.728,4.686,7.491,4.032,9.451L3,12.298z"/>
              <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l4.32-3.24c1.643-1.232,3.994-0.469,4.648,1.491L45,12.298z"/>
            </svg>
            <span className="text-xs sm:text-sm font-medium">@hasfallenz12</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
