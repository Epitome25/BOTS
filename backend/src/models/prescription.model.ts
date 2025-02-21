import {Schema, model} from 'mongoose';
import {medicationSchema} from './medications.model';

const PrescriptionSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    medicines: [medicationSchema],
    notes: {
      type: String,
      default: '',
    },
  },
  {timestamps: true},
);

export const Prescription = model('Prescription', PrescriptionSchema);
