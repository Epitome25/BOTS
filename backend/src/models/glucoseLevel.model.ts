import {Schema, model} from 'mongoose';

const glucoseLevelSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['mg/dL', 'mmol/L'],
    required: true,
  },
  recordedAt: {
    type: Date,
    required: true,
  },
});

export {glucoseLevelSchema};
