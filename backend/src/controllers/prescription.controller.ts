import {Request, Response} from 'express';
import {Prescription} from '../models/prescription.model';

export const createPrescription = async (req: Request, res: Response) => {
  try {
    const {patientId, doctorId, medicines, notes} = req.body;

    const prescription = new Prescription({
      patient: patientId,
      doctor: doctorId,
      medicines,
      notes,
    });
    await prescription.save();

    return res
      .status(200)
      .json({success: 'true', message: 'Prescription created successfully'});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};

export const getPrescriptions = async (
  req: Request,
  res: Response,
) : Promise<any> => {
  try {
    const {userId} = req.params;
    const prescriptions = await Prescription.find({patient: userId})
      .populate('patient', 'name')
      .populate('doctor', 'name');

    if (!prescriptions) {
      return res.status(404).json({
        message: 'ERROR',
        cause: 'No Prescriptions found for the current user',
      });
    }
    return res.status(200).json({prescriptions});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};
