import { Model } from "mongoose";

export type ISubscriptionPlan = {
  _id?: string;
  name: string;
  billingCycle: 'monthly' | 'yearly';
  price: number;
  currency: 'GBP' | 'USD' | 'EUR';
  recommended?: boolean;
  description?: string;
  features: string[];
  buttonText: string;
  isActive?: boolean;
  trialDays?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SubscriptionPlanModel = Model<ISubscriptionPlan>;