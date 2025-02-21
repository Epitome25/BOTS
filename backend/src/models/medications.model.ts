import {Schema, model} from 'mongoose';

const medicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  remainingTablets: {
    type: Number,
  },
  discarded: {
    type: Boolean,
    default: false,
  },
});

export {medicationSchema};
