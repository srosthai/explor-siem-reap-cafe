import Link from 'next/link';
import { TopNav } from '@/components/TopNav';

export default function NotFound() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen flex items-center justify-center px-4 bg-paper dark:bg-ink">
        <div className="text-center">
          <div className="signal-bars h-10 justify-center mx-auto mb-6 text-ink/15 dark:text-paper/15">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h1 className="font-display text-4xl text-ink dark:text-paper mb-4">
            Page not found
          </h1>
          <p className="text-lg text-ink/55 dark:text-paper/55 mb-8 max-w-md mx-auto">
            This page went for a coffee break and never came back.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-palm text-paper rounded-xl font-medium hover:bg-palm-deep btn-press"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Explore</span>
          </Link>
        </div>
      </main>
    </>
  );
}
