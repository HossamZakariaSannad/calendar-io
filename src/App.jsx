/**
 * Calendar Co-pilot - Main App Component
 * 
 * AI-powered availability scheduling system for online tutors.
 * Allows tutors to describe availability in natural language,
 * generates a calendar, and saves to database.
 * 
 * Features:
 * - Natural language processing with Perplexity AI
 * - Visual calendar preview
 * - Persistent storage (localStorage / MongoDB backend)
 */

import { Header, AvailabilityForm, CalendarPreview, SavedCalendars } from './components';
import { Alert } from './components/ui';
import useCalendar from './hooks/useCalendar';

function App() {
  const {
    // State
    calendar,
    tutorId,
    savedTutors,
    loading,
    saving,
    message,
    
    // Actions
    generateCalendar,
    saveCalendar,
    loadCalendar,
    deleteCalendar,
    resetCalendar
  } = useCalendar();

  /**
   * Handle calendar confirmation and save
   */
  const handleConfirm = async () => {
    const success = await saveCalendar();
    if (success) {
      // Reset form after successful save
      setTimeout(() => {
        resetCalendar();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        {/* Status Message */}
        {message && (
          <Alert variant={message.type} className="mb-6">
            {message.text}
          </Alert>
        )}

        {/* Two-Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input Form */}
          <AvailabilityForm 
            onSubmit={generateCalendar}
            loading={loading}
          />

          {/* Calendar Preview */}
          <CalendarPreview
            calendar={calendar}
            tutorId={tutorId}
            onConfirm={handleConfirm}
            onReset={resetCalendar}
            saving={saving}
          />
        </div>

        {/* Saved Calendars */}
        <SavedCalendars
          tutors={savedTutors}
          onLoad={loadCalendar}
          onDelete={deleteCalendar}
        />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-200">
        Calendar Co-pilot • AI-Powered Scheduling
      </footer>
    </div>
  );
}

export default App;
