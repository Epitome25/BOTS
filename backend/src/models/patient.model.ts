import {Schema} from 'mongoose';
import {User} from './user.model';
import {glucoseLevelSchema} from './glucoseLevel.model';

const patientSchema = new Schema({
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  allergies: {
    type: [String],
    default: [],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  diabetesType: {
    type: String,
    enum: ['type1', 'type2'],
    required: false,
  },
  glucoseLevels: [glucoseLevelSchema],
});

export const Patient = User.discriminator('Patient', patientSchema);
