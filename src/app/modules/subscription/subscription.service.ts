import { StatusCodes } from 'http-status-codes';
import { SubscriptionPlan } from './subscription.model';
import { ISubscriptionPlan } from './subscription.interface';
import ApiError from '../../../errors/ApiError';

const createSubscriptionPlan = async (payload: ISubscriptionPlan) => {
  const result = await SubscriptionPlan.create(payload);
  return result;
};

const getAllSubscriptionPlans = async () => {
  const result = await SubscriptionPlan.find({ isActive: true });
  return result;
};

const getSingleSubscriptionPlan = async (id: string) => {
  const result = await SubscriptionPlan.findById(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription plan not found!');
  }
  return result;
};

const updateSubscriptionPlan = async (id: string, payload: Partial<ISubscriptionPlan>) => {
  const result = await SubscriptionPlan.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription plan not found!');
  }
  return result;
};

const deleteSubscriptionPlan = async (id: string) => {
  const result = await SubscriptionPlan.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription plan not found!');
  }
  return result;
};


export const SubscriptionPlanService = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSingleSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
};
