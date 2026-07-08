import { model, Schema, Types } from 'mongoose';
import { IPlan, PlanModel } from './plan.interface';
import {
  ACTIVITY_TYPE,
  BUDGET_TYPE,
  GENDER_TYPE,
  GROUP_SIZE,
  PLAN_TYPE,
  PRIVACY_TYPE,
} from './plan.constant';
import { AGE_TYPE, VIBE_TYPE } from '../../../shared/constrant';

const timeOptionSchema = new Schema({
  value: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const placeOptionSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  image: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  votes: { type: Number, default: 0 },
});

const planSchema = new Schema<IPlan, PlanModel>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    privacy: {
      type: String,
      enum: PRIVACY_TYPE,
      required: true,
    },
    vote_lock: {
      enabled: { type: Boolean, required: true },
      time: { type: Date, required: true },
    },
    plan_type: {
      type: String,
      enum: Object.values(PLAN_TYPE),
      required: true,
    },
    activity: {
      type: String,
      enum: Object.values(ACTIVITY_TYPE),
      required: true,
    },
    vibe: {
      type: String,
      enum: Object.values(VIBE_TYPE),
      required: true,
    },
    group_size: {
      type: String,
      enum: Object.values(GROUP_SIZE),
      required: true,
    },
    budget: {
      type: String,
      enum: Object.values(BUDGET_TYPE),
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(GENDER_TYPE),
      required: true,
    },
    selected_age: {
      type: String,
      enum: Object.values(AGE_TYPE),
      required: true,
    },
    language: {
      type: String,
    },
    image: {
      type: String,
    },
    cover_image: {
      type: String,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    allowTimeVoting: {
      type: Boolean,
      default: false,
    },
    allowPlaceVoting: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
    },
    timeOptions: [timeOptionSchema],
    place: {
      type: String,
    },
    placeOptions: [placeOptionSchema],
  },
  { timestamps: true },
);

export const Plan = model<IPlan, PlanModel>('Plan', planSchema);
