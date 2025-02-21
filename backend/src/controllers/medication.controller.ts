import {Request, Response} from 'express';
import {Prescription} from '../models/prescription.model';
export const getMedications = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const {userId} = req.params;
    const prescription = await Prescription.find({patient: userId});
    if (!prescription) {
      return res.status(404).json({
        message: 'ERROR',
        cause: 'No Medicines found for the current user',
      });
    }

    const medicines = [];
    for (let i = 0; i < prescription.length; i++) {
      medicines.push(...prescription[i].medicines);
    }

    return res.status(200).json({medicines});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};

export const discardMedication = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const {prescriptionId, medicationId} = req.body;
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({
        message: 'ERROR',
        cause: 'No Medicines found for the current user',
      });
    }

    for (let i = 0; i < prescription.medicines.length; i++) {
      if (prescription.medicines[i]._id.toString() === medicationId)
        prescription.medicines[i].discarded = true;
    }
    await prescription.save();

    return res.status(200).json({success: true, message: 'Medicine discarded'});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};

export const undoDiscardMedication = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const {prescriptionId, medicationId} = req.body;
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({
        message: 'ERROR',
        cause: 'No Medicines found for the current user',
      });
    }

    for (let i = 0; i < prescription.medicines.length; i++) {
      if (prescription.medicines[i]._id.toString() === medicationId)
        prescription.medicines[i].discarded = false;
    }
    await prescription.save();

    return res
      .status(200)
      .json({success: true, message: 'Medicine discard undone'});
  } catch (error: any) {
    return res.status(500).json({message: 'ERROR', cause: error.message});
  }
};
