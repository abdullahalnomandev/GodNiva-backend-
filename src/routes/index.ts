import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { SettingsRoutes } from '../app/modules/settings/settings.route';
import { NotificationRoutes } from '../app/modules/notification/notification.route';
import { SubscriptionRoutes } from '../app/modules/subscription/subscription.route';
import { RAGRoutes } from '../app/modules/rag/rag.route';
import { PlanRoutes } from '../app/modules/plan/plan.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/plan',
    route: PlanRoutes
  },
  {
    path: '/subscription',
    route: SubscriptionRoutes
  },
  {
    path: '/settings',
    route:SettingsRoutes
  },
  {
    path: '/notification',
    route: NotificationRoutes
  },
  {
    path: '/rag',
    route: RAGRoutes
  }
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
