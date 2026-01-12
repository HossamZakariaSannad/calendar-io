/**
 * Storage Service - Handles data persistence via MongoDB API
 * 
 * All data is stored in MongoDB through the backend API.
 * No localStorage fallback - requires backend to be running.
 */

// Backend API URL - reads from .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Saves tutor calendar to MongoDB
 * @param {string} tutorId - Unique identifier for the tutor
 * @param {Object} calendarData - Calendar availability data
 * @returns {Promise<Object>} - Saved tutor data
 */
export const saveTutorCalendar = async (tutorId, calendarData) => {
  const response = await fetch(`${API_URL}/tutors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tutorId,
      availability: calendarData
    })
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Failed to save: ${response.status}`);
  }
  
  const saved = await response.json();
  console.log('✅ Saved to MongoDB:', tutorId);
  return saved;
};

/**
 * Gets all saved tutors from MongoDB
 * @returns {Promise<Array>} - Array of tutor data objects
 */
export const getAllTutors = async () => {
  const response = await fetch(`${API_URL}/tutors`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tutors: ${response.status}`);
  }
  
  const tutors = await response.json();
  console.log('✅ Fetched from MongoDB:', tutors.length, 'tutors');
  return tutors;
};

/**
 * Gets a specific tutor by ID from MongoDB
 * @param {string} tutorId - Tutor identifier
 * @returns {Promise<Object|null>} - Tutor data or null if not found
 */
export const getTutorById = async (tutorId) => {
  const response = await fetch(`${API_URL}/tutors/${tutorId}`);
  
  if (response.status === 404) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tutor: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Deletes a tutor calendar from MongoDB
 * @param {string} tutorId - Tutor identifier
 * @returns {Promise<boolean>} - True if deleted successfully
 */
export const deleteTutorCalendar = async (tutorId) => {
  const response = await fetch(`${API_URL}/tutors/${tutorId}`, {
    method: 'DELETE'
  });
  
  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete: ${response.status}`);
  }
  
  console.log('✅ Deleted from MongoDB:', tutorId);
  return true;
};

/**
 * Calculates statistics for calendar data
 * @param {Object} calendarData - Calendar availability data
 * @returns {Object} - Statistics object with totalSlots and totalHours
 */
export const calculateStats = (calendarData) => {
  if (!calendarData) return { totalSlots: 0, totalHours: 0 };
  
  const totalSlots = Object.values(calendarData).reduce(
    (sum, slots) => sum + (Array.isArray(slots) ? slots.length : 0),
    0
  );
  
  return {
    totalSlots,
    totalHours: (totalSlots * 30 / 60).toFixed(1)
  };
};

export default {
  saveTutorCalendar,
  getAllTutors,
  getTutorById,
  deleteTutorCalendar,
  calculateStats
};
