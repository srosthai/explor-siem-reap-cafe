import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - How We Test & Review Cafes',
  description:
    'Learn how we test Wi-Fi speeds using Speedtest by Ookla, why minimum prices matter for digital nomads, and how you can contribute to the Siem Reap cafe directory.',
  openGraph: {
    title: 'About Siem Reap Cafes - Our Testing Process',
    description: 'Discover how we personally visit and test every cafe in Siem Reap for Wi-Fi speed, pricing, and ambiance.',
  },
  alternates: {
    canonical: '/about',
  },
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Real Wi-Fi Tests',
    description: 'Every speed is measured on-site using Speedtest by Ookla during working hours.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Honest Pricing',
    description: 'Minimum prices help you budget and find affordable spots for longer work sessions.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Local First',
    description: 'We personally visit every cafe. No paid listings, no sponsored rankings.',
  },
];

const tags = [
  { name: 'Work-friendly', description: 'Good setup for laptop work', color: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400' },
  { name: 'Aircon', description: 'Air conditioning available', color: 'bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400' },
  { name: 'Quiet', description: 'Low noise, good for focus', color: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400' },
  { name: 'Aesthetic', description: 'Instagram-worthy interior', color: 'bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400' },
  { name: 'Power outlets', description: 'Plenty of charging spots', color: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400' },
  { name: 'Cozy', description: 'Comfortable, relaxed vibe', color: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400' },
];

const steps = [
  { number: '01', title: 'Visit', description: 'We go to each cafe during typical working hours' },
  { number: '02', title: 'Test', description: 'Run multiple speed tests and note the environment' },
  { number: '03', title: 'Document', description: 'Record prices, amenities, and overall vibe' },
  { number: '04', title: 'Share', description: 'Publish honest, unbiased information' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950 rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Finding great cafes,
            <br />
            <span className="text-gray-400 dark:text-gray-500">so you don&apos;t have to.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We test Wi-Fi, check prices, and rate the vibes at every cafe in Siem Reap.
            No ads, no sponsored content - just honest recommendations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Our Process
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            How we gather and verify cafe information
          </p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 h-full">
                <span className="text-3xl font-bold text-gray-100 dark:text-gray-800">
                  {step.number}
                </span>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-3 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-px bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tags Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Understanding Tags
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              What each label means when browsing cafes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tags.map((tag) => (
              <div
                key={tag.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${tag.color}`}>
                  {tag.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tag.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-white p-8 sm:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-gray-900 mb-4">
              Own a cafe in Siem Reap?
            </h2>
            <p className="text-gray-400 dark:text-gray-600 mb-8 max-w-md mx-auto">
              Want to update your listing or add your cafe to our directory?
              We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Explore Cafes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-500 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
          </div>
        </div>
      </section>
    </main>
  );
}
