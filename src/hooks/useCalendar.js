/**
 * useCalendar Hook
 * 
 * Custom hook for managing calendar state and operations.
 * Handles AI parsing, saving, loading, and state management.
 */

import { useState, useEffect, useCallback } from 'react';
import { parseAvailabilityWithAI } from '../services/api';
import { saveTutorCalendar, getAllTutors, deleteTutorCalendar } from '../services/storage';

/**
 * Message types for status display
 */
export const MESSAGE_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};

export default function useCalendar() {
  // Current calendar state
  const [calendar, setCalendar] = useState(null);
  const [tutorId, setTutorId] = useState('');
  
  // Saved tutors list
  const [savedTutors, setSavedTutors] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Status message
  const [message, setMessage] = useState(null);

  /**
   * Load saved tutors on mount
   */
  useEffect(() => {
    loadSavedTutors();
  }, []);

  /**
   * Load all saved tutors from storage (async - uses MongoDB)
   */
  const loadSavedTutors = useCallback(async () => {
    try {
      const tutors = await getAllTutors();
      setSavedTutors(tutors);
    } catch (error) {
      console.error('Error loading tutors:', error);
      setSavedTutors([]);
    }
  }, []);

  /**
   * Show a status message
   */
  const showMessage = useCallback((text, type = MESSAGE_TYPES.INFO, duration = 5000) => {
    setMessage({ text, type });
    if (duration > 0) {
      setTimeout(() => setMessage(null), duration);
    }
  }, []);

  /**
   * Clear the status message
   */
  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  /**
   * Generate calendar from natural language description
   */
  const generateCalendar = useCallback(async ({ description, tutorId: id }) => {
    setLoading(true);
    clearMessage();

    try {
      showMessage('Processing your availability with AI...', MESSAGE_TYPES.INFO, 0);
      
      const parsedCalendar = await parseAvailabilityWithAI(description);
      
      setCalendar(parsedCalendar);
      setTutorId(id);
      
      showMessage('Calendar generated successfully! Review and confirm below.', MESSAGE_TYPES.SUCCESS);
    } catch (error) {
      console.error('Generation error:', error);
      showMessage(`Error: ${error.message}. Please try again.`, MESSAGE_TYPES.ERROR);
      setCalendar(null);
    } finally {
      setLoading(false);
    }
  }, [showMessage, clearMessage]);

  /**
   * Save the current calendar
   */
  const saveCalendar = useCallback(async () => {
    if (!calendar || !tutorId) {
      showMessage('No calendar to save', MESSAGE_TYPES.ERROR);
      return false;
    }

    setSaving(true);

    try {
      await saveTutorCalendar(tutorId, calendar);
      showMessage(`Calendar saved successfully for "${tutorId}"!`, MESSAGE_TYPES.SUCCESS);
      loadSavedTutors();
      return true;
    } catch (error) {
      console.error('Save error:', error);
      showMessage(`Save error: ${error.message}`, MESSAGE_TYPES.ERROR);
      return false;
    } finally {
      setSaving(false);
    }
  }, [calendar, tutorId, showMessage, loadSavedTutors]);

  /**
   * Load a saved tutor's calendar
   */
  const loadCalendar = useCallback((tutor) => {
    setCalendar(tutor.availability);
    setTutorId(tutor.tutorId);
    showMessage(`Loaded calendar for "${tutor.tutorId}"`, MESSAGE_TYPES.INFO);
  }, [showMessage]);

  /**
   * Delete a saved calendar
   */
  const deleteCalendar = useCallback(async (id) => {
    if (window.confirm(`Are you sure you want to delete the calendar for "${id}"?`)) {
      await deleteTutorCalendar(id);
      await loadSavedTutors();
      
      // Clear current if it was the deleted one
      if (tutorId === id) {
        resetCalendar();
      }
      
      showMessage(`Calendar for "${id}" deleted`, MESSAGE_TYPES.INFO);
    }
  }, [tutorId, loadSavedTutors, showMessage]);

  /**
   * Reset the current calendar
   */
  const resetCalendar = useCallback(() => {
    setCalendar(null);
    setTutorId('');
    clearMessage();
  }, [clearMessage]);

  return {
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
    resetCalendar,
    showMessage,
    clearMessage
  };
}
