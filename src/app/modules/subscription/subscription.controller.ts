import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubscriptionPlanService } from './subscription.service';

const createSubscriptionPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionPlanService.createSubscriptionPlan(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Subscription plan created successfully',
    data: result,
  });
});

const getAllSubscriptionPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionPlanService.getAllSubscriptionPlans();
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All subscription plans retrieved successfully',
    data: result,
  });
});

const getSingleSubscriptionPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubscriptionPlanService.getSingleSubscriptionPlan(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscription plan retrieved successfully',
    data: result,
  });
});

const updateSubscriptionPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubscriptionPlanService.updateSubscriptionPlan(id, req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscription plan updated successfully',
    data: result,
  });
});

const deleteSubscriptionPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubscriptionPlanService.deleteSubscriptionPlan(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Subscription plan deleted successfully',
    data: result,
  });
});

export const SubscriptionController = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSingleSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
};
