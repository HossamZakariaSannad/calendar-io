/**
 * Header Component - App branding and description
 */

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-8 px-6 rounded-b-2xl shadow-lg mb-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-4xl">📅</span>
          Calendar Co-pilot
        </h1>
        <p className="text-teal-100 text-sm">
          AI-powered availability scheduling system for online tutors
        </p>
      </div>
    </header>
  );
}
