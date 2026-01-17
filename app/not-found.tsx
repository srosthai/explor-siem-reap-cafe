import Link from 'next/link';
import { TopNav } from '@/components/TopNav';

export default function NotFound() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-6">☕💨</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Oops! Page not found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Looks like this page went for a coffee break and never came back.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:from-purple-600 hover:to-pink-600 btn-press"
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
