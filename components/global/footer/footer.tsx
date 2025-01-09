import Link from 'next/link'
import { ThemeChangerBtn } from './themeChangerBtn';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-start items-center space-x-4 md:space-x-6">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  Posts
                </Link>
              </li>
              <li>
                <ThemeChangerBtn />
              </li>
            </ul>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Paradox Tech BD. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Developed by{" "}
              <Link
                className="border-b text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                href={`https://shahriarhasan.vercel.app?ref=https://mealman.vercel.app`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Shahriar Hasan
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

