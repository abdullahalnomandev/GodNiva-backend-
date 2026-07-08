import mongoose, { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
import {  FREE_TIME_TYPE, INTEREST_TYPE, MEET_PREFER_TYPE, MOOD_TYPE, PREFERRED_TRANSPORT_TYPE, PROFILE_MODE, USER_AUTH_PROVIDER } from './user.constant';
import { AGE_TYPE, VIBE_TYPE } from '../../../shared/constrant';

export interface IUser {
  _id: Types.ObjectId;
  // Step -1
  name: string;
  email?: string;
  mobile?: string;
  gender?: string;
  birth_date?: Date;
  selected_age?: AGE_TYPE;
  address?: string;
  location?:{
    type: {
      type: String;
      default: 'Point';
    };
    coordinates: {
      type: [Number];
      default: [];
    };
  };

  // Step 2
  interests: INTEREST_TYPE[];
  // Step 3
  language?: string;
  preferred_chat_language?: string;
  // Step 4
  meet_prefer?: MEET_PREFER_TYPE;
  // Step 5
  vibe?: VIBE_TYPE;
  // Step 6
  free_time?: FREE_TIME_TYPE;
  // Step 7
  mood_today?: MOOD_TYPE;
  // Step 8
  transport_address?: string;
  transport_location?:{
    type: {
      type: String;
      default: 'Point';
    };
    coordinates: {
      type: [Number];
      default: [];
    };
  }
  preferred_transport?: PREFERRED_TRANSPORT_TYPE;
  maximum_commute_distance?: number;
  // Next
  image?: string; // Verify your ID image
  verify_image?: string; // Verify your ID image
  media?: string; // Add a short intro
  subscription?: mongoose.Types.ObjectId;
  about?: string;
  
  confirm_password?: string;
  password: string;
  role: USER_ROLES;
  status: 'active' | 'delete';
  verified: boolean;
  verified_badge?: boolean;

  profile_mode: PROFILE_MODE;

  token?: string; // For Google Login
  fcmToken?: string;
  authorization?: {
    oneTimeCode: string;
    expireAt: Date;
  };
  google_id_token?: string;
  auth_provider: USER_AUTH_PROVIDER;
}

export interface UserModel extends Model<IUser> {
  isExistUserById(id: string): Promise<IUser | null>;
  isExistUserByEmail(email: string): Promise<IUser | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}
