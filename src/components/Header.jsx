/**
 * Header Component - App branding and description
 */

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-6 sm:py-8 lg:py-10 px-4 sm:px-6 rounded-b-2xl shadow-lg mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
          <span className="text-3xl sm:text-4xl lg:text-5xl">📅</span>
          Calendar Co-pilot
        </h1>
        <p className="text-teal-100 text-xs sm:text-sm">
          AI-powered availability scheduling system for online tutors
        </p>
      </div>
    </header>
  );
}
