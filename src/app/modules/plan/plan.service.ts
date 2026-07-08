import { StatusCodes } from 'http-status-codes';
import { Plan } from './plan.model';
import { IPlan } from './plan.interface';
import ApiError from '../../../errors/ApiError';

const createPlan = async (payload: IPlan) => {
  const result = await Plan.create(payload);
  return result;
};

const getAllPlans = async () => {
  const result = await Plan.find().populate('creator', 'name email');
  return result;
};

const getSinglePlan = async (id: string) => {
  const result = await Plan.findById(id).populate('creator', 'name email');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Plan not found!');
  }
  return result;
};

const updatePlan = async (id: string, payload: Partial<IPlan>) => {
  const result = await Plan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('creator', 'name email');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Plan not found!');
  }
  return result;
};

const deletePlan = async (id: string) => {
  const result = await Plan.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Plan not found!');
  }
  return result;
};


export const PlanService = {
  createPlan,
  getAllPlans,
  getSinglePlan,
  updatePlan,
  deletePlan,
};
