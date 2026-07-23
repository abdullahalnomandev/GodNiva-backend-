import { StatusCodes } from 'http-status-codes';
import { Plan } from './plan.model';
import { IPlan } from './plan.interface';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';

const createPlan = async (payload: IPlan) => {
  const result = await Plan.create(payload);
  return result;
};

const getAllPlans = async (query: any, user: any) => {
  const baseQuery = Plan.find();
   const planQuery = new QueryBuilder(baseQuery, query)
    .paginate()
    .fields()
    .sort();

  const result = await planQuery.modelQuery.lean();
  const pagination = await planQuery.getPaginationInfo();

  return {
    pagination,
    data: result,
  };

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
