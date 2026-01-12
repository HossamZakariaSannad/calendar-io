/**
 * Tutor Routes - API endpoints for tutor operations
 */

import express from 'express';
import Tutor from '../models/Tutor.js';

const router = express.Router();

/**
 * GET /api/tutors
 * Get all tutors sorted by last updated
 */
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find().sort({ updatedAt: -1 });
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/tutors/:tutorId
 * Get a specific tutor by ID
 */
router.get('/:tutorId', async (req, res) => {
  try {
    const tutor = await Tutor.findOne({ tutorId: req.params.tutorId });
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found' });
    }
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/tutors
 * Create or update a tutor's availability
 */
router.post('/', async (req, res) => {
  try {
    const { tutorId, availability } = req.body;
    
    if (!tutorId) {
      return res.status(400).json({ error: 'tutorId is required' });
    }
    
    const tutor = await Tutor.findOneAndUpdate(
      { tutorId },
      { 
        tutorId,
        availability,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true
      }
    );
    
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/tutors/:tutorId
 * Delete a tutor's calendar
 */
router.delete('/:tutorId', async (req, res) => {
  try {
    const result = await Tutor.deleteOne({ tutorId: req.params.tutorId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Tutor not found' });
    }
    res.json({ message: 'Tutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
