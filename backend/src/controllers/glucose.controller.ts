import {Request, Response} from 'express';
import {Patient} from '../models/patient.model';

export const updateGlucoseLevel = async (req: Request, res: Response) => {
  try {
    const {patientId, value, unit, recordedAt} = req.body;

    const patient: any = await Patient.findById(patientId);
    if (!patient)
      return res
        .status(404)
        .json({message: 'ERROR', cause: 'Patient not found'});

    patient.glucoseLevels.push({value, unit, recordedAt});
    await patient.save();

    return res
      .status(200)
      .json({success: 'true', message: 'Glucose level updated successfully'});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};

