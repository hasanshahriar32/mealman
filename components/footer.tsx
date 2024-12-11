import Link from 'next/link'

export default function Footer() {
  const baseUrl = process.env.BASE_URL || "https://mealman.vercel.app";
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Posts
                </Link>
              </li>
            </ul>
          </nav>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Paradox Tech BD. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Developed by{" "}
              <Link
                className="border-b text-gray-400 hover:text-gray-600"
                href={`https://shahriarhasan.vercel.app?ref=${baseUrl}`}
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

