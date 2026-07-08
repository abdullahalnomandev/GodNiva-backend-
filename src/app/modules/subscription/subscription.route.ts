import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { SubscriptionController } from './subscription.controller';

const router = express.Router();
router
  .route('/')
  .post(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    SubscriptionController.createSubscriptionPlan
  )
  .get(
    SubscriptionController.getAllSubscriptionPlans
  );

router
  .route('/:id')
  .get(
    SubscriptionController.getSingleSubscriptionPlan
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    SubscriptionController.updateSubscriptionPlan
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    SubscriptionController.deleteSubscriptionPlan
  );

export const SubscriptionRoutes = router;
