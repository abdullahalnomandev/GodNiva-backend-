import { model, Schema, Model } from 'mongoose';
import { ISubscriptionPlan, SubscriptionPlanModel } from './subscription.interface';

const subscriptionPlanSchema = new Schema<ISubscriptionPlan, SubscriptionPlanModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    billingCycle: {
      type: String,
      required: true,
      enum: ['monthly', 'yearly']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      enum: ['GBP', 'USD', 'EUR']
    },
    recommended: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    features: [{
      type: String,
      trim: true
    }],
    buttonText: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    trialDays: {
      type: Number,
      min: 0
    }
  },
  { timestamps: true }
);

export const SubscriptionPlan = model<ISubscriptionPlan, SubscriptionPlanModel>(
  'SubscriptionPlan',
  subscriptionPlanSchema
);
