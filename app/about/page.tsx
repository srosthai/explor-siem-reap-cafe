import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About Us - How We Test & Review Cafes',
  description:
    'Learn how we test Wi-Fi speeds using Speedtest by Ookla, why minimum prices matter for digital nomads, and how you can contribute to the Siem Reap cafe directory.',
  openGraph: {
    title: 'About Siem Reap Cafes - Our Testing Process',
    description: 'Discover how we personally visit and test every cafe in Siem Reap for Wi-Fi speed, pricing, and ambiance.',
  },
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Precision Wi-Fi Benchmarks',
    description: 'We don\'t guess. Every speed is a real-world measurement taken during peak working hours to ensure reliability.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50/50 dark:bg-blue-900/20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Budget Transparency',
    description: 'From $1.50 lattes to $5 specialty brews. We track minimum prices so you can find a spot that fits your daily spend.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50/50 dark:bg-emerald-900/20',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Zero Influence Reviews',
    description: 'We visit incognito. No free coffees, no sponsored rankings. Just the raw, honest truth for the nomad community.',
    color: 'text-violet-500',
    bgColor: 'bg-violet-50/50 dark:bg-violet-900/20',
  },
];

const steps = [
  {
    number: '01',
    title: 'The Visit',
    description: 'We arrive like any other customer, usually with a laptop and a craving for caffeine.'
  },
  {
    number: '02',
    title: 'The Benchmark',
    description: 'Running Speedtest by Ookla at multiple seating locations to find the "hot spots".'
  },
  {
    number: '03',
    title: 'The Vibe Check',
    description: 'Noting volume, AC efficiency, seating comfort, and availability of power outlets.'
  },
  {
    number: '04',
    title: 'The Upload',
    description: 'Processing the data and photos to keep our directory the most accurate in Siem Reap.'
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10">
          <div className="absolute top-[-10%] right-[10%] w-[40%] h-[60%] rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[35%] h-[50%] rounded-full bg-violet-100/50 dark:bg-violet-900/10 blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Our Mission</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight leading-[1.1]">
            We visit every cafe in
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 mt-2">
              Siem Reap.
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Finding a place to work shouldn&apos;t be a gamble. We provide the data you need to skip the bad Wi-Fi and find your perfect flow.
          </p>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${feature.bgColor} ${feature.color} mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The Methodology / Process */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Methodology
          </h2>
          <div className="w-12 h-1 bg-violet-500 mx-auto rounded-full" />
        </div>

        <div className="relative space-y-12">
          {/* Vertical line connecting steps (hidden on small screens) */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />

          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col sm:flex-row gap-8 items-start">
              {/* Number circle */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center z-10 shadow-sm group-hover:border-violet-500 transition-colors">
                <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                  {step.number}
                </span>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Team / Transparency */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 dark:from-white dark:to-blue-50 rounded-[2.5rem] p-8 sm:p-16 text-center text-white dark:text-gray-900 relative overflow-hidden shadow-2xl shadow-blue-500/10">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 blur-[80px] -ml-32 -mb-32" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Founded in Siem Reap, for the world.
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              We started this directory in 2024 because we were tired of "work-friendly" lists that were just paid ads. We visit, we test, and we share.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href="/"
                variant="primary"
                size="lg"
                className="rounded-full px-8 !bg-white !text-gray-900 dark:!bg-gray-900 dark:!text-white"
              >
                Explore the Cafes
              </Button>
              <Button
                href="mailto:hello@siemreapcafes.com"
                variant="secondary"
                size="lg"
                className="rounded-full px-8 !bg-transparent !text-white dark:!text-gray-900 !border-white/30 dark:!border-gray-900/30 hover:!bg-white/10 dark:hover:!bg-gray-900/5 transition-all"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Note */}
      <div className="text-center mt-12">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Last updated: January 2026 • Built with passion for coffee & code.
        </p>
      </div>
    </main>
  );
}
