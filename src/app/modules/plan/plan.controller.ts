import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PlanService } from './plan.service';
import { getMultipleFilesPath, getSingleFilePath } from '../../../shared/getFilePath';

const createPlan = catchAsync(async (req: Request, res: Response) => {
  // req.body.creator = req.user.id;
  const image = getSingleFilePath(req.files,"image");
  const cover_image = getMultipleFilesPath(req.files,"cover_image");
  if(image){
    req.body.image = image;
  }
  if(cover_image){
    req.body.cover_image = cover_image;
  }
  
  const result = await PlanService.createPlan(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Plan created successfully',
    data: result,
  });
});

const getAllPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanService.getAllPlans();
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All plans retrieved successfully',
    data: result,
  });
});

const getSinglePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlanService.getSinglePlan(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Plan retrieved successfully',
    data: result,
  });
});

const updatePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlanService.updatePlan(id, req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Plan updated successfully',
    data: result,
  });
});

const deletePlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlanService.deletePlan(id);
  
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Plan deleted successfully',
    data: result,
  });
});

export const PlanController = {
  createPlan,
  getAllPlans,
  getSinglePlan,
  updatePlan,
  deletePlan,
};
