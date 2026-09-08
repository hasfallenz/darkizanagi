'use client';

import { useState } from 'react';

export function HomeContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Format capitalization for name (e.g. dimas -> Dimas)
    const formattedName = name
      .trim()
      .split(' ')
      .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
      .join(' ');

    const finalBody = `Dear ${formattedName}, ${message.trim()}`;
    const subject = `Pesan dari ${formattedName} (darkizanagi blog)`;
    const mailtoUrl = `mailto:hasfallenz12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section className="rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-8 lg:p-10 shadow-sm transition-all">
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Kirim Pesan Langsung
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Punya pertanyaan, diskusi seputar software engineering, atau kolaborasi? Tulis pesan di bawah.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="form-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Nama Lengkap / Panggilan
            </label>
            <input
              id="form-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuliskan nama anda"
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-colors outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="form-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Isi Pesan
            </label>
            <textarea
              id="form-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan pesan atau topik diskusi Anda di sini..."
              className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-colors outline-none resize-y"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white font-semibold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer"
            >
              {/* Authentic Google Gmail Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48" fill="none">
                <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
                <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L8.68,7.96C7.037,6.728,4.686,7.491,4.032,9.451L3,12.298z"/>
                <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l4.32-3.24c1.643-1.232,3.994-0.469,4.648,1.491L45,12.298z"/>
              </svg>
              <span>Kirim via Email</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
