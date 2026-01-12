/**
 * SavedCalendars Component
 * 
 * Displays a list of previously saved tutor calendars.
 * Allows loading saved calendars back into the preview.
 */

import { Card, CardTitle } from './ui';
import { calculateStats } from '../services/storage';

/**
 * Formats a date string for display
 */
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Unknown date';
  }
};

/**
 * TutorCard Component - Displays a single saved tutor
 */
function TutorCard({ tutor, onClick, onDelete }) {
  const stats = calculateStats(tutor.availability);

  return (
    <div 
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 
                 hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer
                 group relative"
      onClick={() => onClick(tutor)}
    >
      {/* Delete button */}
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                   text-red-400 hover:text-red-600 transition-all p-1"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(tutor.tutorId);
        }}
        title="Delete calendar"
      >
        ✕
      </button>

      <div className="font-semibold text-gray-700 mb-2 pr-6">
        {tutor.tutorId}
      </div>
      
      <div className="text-sm text-gray-500 mb-2">
        {stats.totalSlots} slots • {stats.totalHours}h/week
      </div>
      
      <div className="text-xs text-gray-400">
        Updated: {formatDate(tutor.updatedAt)}
      </div>
    </div>
  );
}

export default function SavedCalendars({ tutors, onLoad, onDelete }) {
  const hasTutors = tutors && tutors.length > 0;

  return (
    <Card hover={false}>
      <CardTitle>📚 Saved Calendars</CardTitle>

      {hasTutors ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tutors.map((tutor) => (
            <TutorCard 
              key={tutor.tutorId} 
              tutor={tutor} 
              onClick={onLoad}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <div className="text-3xl mb-2">📭</div>
          <p>No calendars saved yet</p>
          <p className="text-sm mt-1">Generate and save a calendar to see it here</p>
        </div>
      )}
    </Card>
  );
}
