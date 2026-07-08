import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { PlanController } from './plan.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();
router
  .route('/')
  .post(
    // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    PlanController.createPlan
  )
  .get(
    PlanController.getAllPlans
  );

router
  .route('/:id')
  .get(
    PlanController.getSinglePlan
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    PlanController.updatePlan
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    PlanController.deletePlan
  );

export const PlanRoutes = router;
