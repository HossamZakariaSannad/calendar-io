/**
 * Tutor Model - MongoDB Schema
 * 
 * Defines the schema for tutor profiles with availability data.
 */

import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  tutorId: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  availability: {
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
tutorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;
