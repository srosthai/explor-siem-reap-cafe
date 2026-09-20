import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - How We Test & Review Cafes',
  description:
    'Learn how we test Wi-Fi speeds using Speedtest by Ookla, why minimum prices matter for digital nomads, and how you can contribute to the Siem Reap cafe directory.',
  openGraph: {
    title: 'About Siem Reap Cafe Finder - Our Testing Process',
    description: 'Discover how we personally visit and test every cafe in Siem Reap for Wi-Fi speed, pricing, and ambiance.',
  },
};

const pillars = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Real Wi-Fi speeds',
    description: 'Every speed is a real-world Ookla test taken during peak hours. No guessing.',
    accent: 'bg-palm-soft dark:bg-palm-deep/30 text-palm dark:text-palm',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Honest pricing',
    description: 'We track minimum prices so you know what to expect before you walk in.',
    accent: 'bg-gold-soft dark:bg-gold/20 text-gold dark:text-gold',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Zero influence',
    description: 'No sponsorships, no free coffees. We visit incognito and pay our own bills.',
    accent: 'bg-clay-soft dark:bg-clay/20 text-clay dark:text-clay',
  },
];

const steps = [
  {
    title: 'Visit',
    description: 'We walk in like any other customer — laptop bag, caffeine craving, and all.',
  },
  {
    title: 'Benchmark',
    description: 'Speedtest by Ookla from multiple seats to find the real download and upload speeds.',
  },
  {
    title: 'Vibe check',
    description: 'Volume, AC, seating comfort, power outlets, lighting — every detail that matters for work.',
  },
  {
    title: 'Publish',
    description: 'Data and photos are processed and uploaded to keep the directory accurate and fresh.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">
        <h1 className="font-display text-4xl sm:text-5xl text-ink dark:text-paper mb-5 leading-[1.15]">
          We visit every café in Siem Reap ourselves.
        </h1>
        <p className="text-lg text-ink/60 dark:text-paper/60 max-w-xl leading-relaxed">
          Finding a place to work shouldn&apos;t be a gamble. We test the Wi-Fi, track prices, and rate the vibes, so you don&apos;t have to.
        </p>
      </section>

      {/* Pillars */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-paper dark:bg-ink-soft rounded-xl p-6 border border-ink/8 dark:border-paper/10"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${pillar.accent} mb-4`}>
                {pillar.icon}
              </div>
              <h3 className="text-base font-semibold text-ink dark:text-paper mb-1.5">
                {pillar.title}
              </h3>
              <p className="text-sm text-ink/55 dark:text-paper/55 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display text-3xl text-ink dark:text-paper mb-10">
          Our process
        </h2>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex gap-5 pb-8 last:pb-0"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-palm-soft dark:bg-palm-deep/30 border-2 border-paper dark:border-ink flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-palm-deep dark:text-palm">
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-ink/10 dark:bg-paper/15 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="pt-1 pb-2">
                <h3 className="text-lg font-semibold text-ink dark:text-paper mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/55 dark:text-paper/55 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-ink dark:bg-ink-soft rounded-xl p-8 sm:p-10 relative overflow-hidden">
          {/* Subtle jungle glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-palm/20 blur-[80px] -mr-16 -mt-16" />

          <div className="relative z-10 max-w-lg">
            <h2 className="font-display text-2xl sm:text-3xl text-paper mb-3">
              Founded in Siem Reap, for the world.
            </h2>
            <p className="text-paper/60 mb-8 text-sm leading-relaxed">
              We started this directory because we were tired of &ldquo;work-friendly&rdquo; café lists that were just paid ads. Every review is independent.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-palm text-paper rounded-xl text-sm font-semibold hover:bg-palm-deep transition-colors"
              >
                Explore cafés
              </Link>
              <a
                href="mailto:hello@siemreapcafes.com?subject=Hello"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-paper/10 text-paper border border-paper/15 rounded-xl text-sm font-medium hover:bg-paper/15 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center">
        <p className="text-xs text-ink/35 dark:text-paper/30">
          Last updated March 2026
        </p>
      </div>
    </main>
  );
}
