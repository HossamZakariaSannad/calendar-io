/**
 * CalendarPreview Component
 * 
 * Displays the AI-generated calendar for review and confirmation.
 * Shows a week grid with time slots for each day.
 */

import { Card, CardTitle, CardDescription, Button } from './ui';
import { calculateStats } from '../services/storage';

// Day names for display
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Short day names for compact display
const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/**
 * Formats time slot for display (e.g., "09:00" -> "9:00 AM")
 */
const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Adds 30 minutes to a time slot to get end time
 * (e.g., "10:30" -> "11:00")
 */
const getEndTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  let endMinutes = minutes + 30;
  let endHours = hours;
  
  if (endMinutes >= 60) {
    endMinutes -= 60;
    endHours += 1;
  }
  if (endHours >= 24) {
    endHours = 0;
  }
  
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
};

/**
 * Groups consecutive time slots for better display
 */
const groupTimeSlots = (slots) => {
  if (!slots || slots.length === 0) return [];
  
  const groups = [];
  let currentGroup = [slots[0]];
  
  for (let i = 1; i < slots.length; i++) {
    const prevTime = slots[i - 1].split(':').map(Number);
    const currTime = slots[i].split(':').map(Number);
    const prevMinutes = prevTime[0] * 60 + prevTime[1];
    const currMinutes = currTime[0] * 60 + currTime[1];
    
    if (currMinutes - prevMinutes === 30) {
      currentGroup.push(slots[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [slots[i]];
    }
  }
  groups.push(currentGroup);
  
  return groups;
};

/**
 * DayColumn Component - Displays slots for a single day
 */
function DayColumn({ day, slots }) {
  const dayIndex = DAYS.findIndex(d => d.toLowerCase() === day.toLowerCase());
  const displayDay = SHORT_DAYS[dayIndex] || day;
  const groups = groupTimeSlots(slots);
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-[120px]">
      <h3 className="text-sm font-semibold text-gray-700 text-center mb-2">
        {displayDay}
      </h3>
      <p className="text-xs text-gray-400 text-center mb-3">
        {slots.length} slots
      </p>
      
      {slots.length > 0 ? (
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {groups.map((group, i) => (
            <div
              key={i}
              className="bg-green-50 border border-green-200 rounded px-2 py-1.5 text-xs text-green-700"
            >
              {group.length === 1 ? (
                formatTime(group[0])
              ) : (
                `${formatTime(group[0])} - ${formatTime(getEndTime(group[group.length - 1]))}`
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-300 text-center italic">No slots</p>
      )}
    </div>
  );
}

/**
 * Stats Display Component
 */
function StatsDisplay({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-teal-600">{stats.totalSlots}</div>
        <div className="text-xs text-gray-500 mt-1">Total Slots</div>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-teal-600">{stats.totalHours}h</div>
        <div className="text-xs text-gray-500 mt-1">Hours/Week</div>
      </div>
    </div>
  );
}

export default function CalendarPreview({ 
  calendar, 
  tutorId,
  onConfirm, 
  onReset,
  saving 
}) {
  const hasCalendar = calendar && Object.keys(calendar).length > 0;
  const stats = calculateStats(calendar);

  return (
    <Card>
      <CardTitle>Step 2: Review & Confirm</CardTitle>
      <CardDescription>
        {hasCalendar 
          ? `Calendar generated for "${tutorId}". Review the time slots and confirm to save.`
          : 'Generate a calendar to see your availability here'
        }
      </CardDescription>

      {hasCalendar ? (
        <>
          {/* Statistics */}
          <StatsDisplay stats={stats} />

          {/* Week Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {DAYS.map((day) => (
              <DayColumn
                key={day}
                day={day}
                slots={calendar[day.toLowerCase()] || []}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="success" 
              className="flex-1"
              onClick={onConfirm}
              loading={saving}
            >
              ✓ Confirm & Save
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={onReset}
              disabled={saving}
            >
              ↻ Reset
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-3">📅</div>
          <p>Enter your availability and click "Generate Calendar"</p>
        </div>
      )}
    </Card>
  );
}
