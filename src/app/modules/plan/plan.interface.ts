import mongoose, { Model } from 'mongoose';
import { AGE_TYPE, VIBE_TYPE } from '../../../shared/constrant';
import {
  ACTIVITY_TYPE,
  BUDGET_TYPE,
  GENDER_TYPE,
  GROUP_SIZE,
  PLAN_TYPE,
  PRIVACY_TYPE,
} from './plan.constant';

export type ITimeOption = {
  _id: string;
  value: string;
  votes?: number;
};

export type IPlaceOption = {
  _id: string;
  name: string; //ex: Home, Work, Public Space, etc.
  address?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  subtitle: string;
  votes?: number;
};

export type IPlan = {
  _id?: string;
  creator: mongoose.Types.ObjectId;
  privacy: PRIVACY_TYPE;
  vote_lock: {
    enabled: boolean;
    time: Date;
  };
  plan_type: PLAN_TYPE;
  activity: ACTIVITY_TYPE;
  vibe: VIBE_TYPE;
  group_size: GROUP_SIZE;
  budget: BUDGET_TYPE;
  gender: GENDER_TYPE;
  selected_age: AGE_TYPE;
  language?: string;
  image?: string;
  cover_image?: string[];
  title?: string;
  date?: Date;
  allowTimeVoting?: boolean;
  allowPlaceVoting?: boolean;
  // voting time
  time?: string;
  timeOptions?: ITimeOption[];
  // voting place
  place?: string;
  placeOptions?: IPlaceOption[];
  place_images?: string[];
};

export type PlanModel = Model<IPlan>;
