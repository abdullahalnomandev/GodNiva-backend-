import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { model, Schema, Types } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModel } from './user.interface';
import {
  USER_AUTH_PROVIDER,
  PROFILE_MODE,
  MEET_PREFER_TYPE,
  MOOD_TYPE,
  INTEREST_TYPE,
  FREE_TIME_TYPE,
} from './user.constant';
import { AGE_TYPE, VIBE_TYPE } from '../../../shared/constrant';
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
    },
    gender: {
      type: String,
    },
    birth_date: {
      type: Date,
    },
    selected_age: {
      type: String,
      enum: Object.values(AGE_TYPE),
         },
    address: {
      type: String,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [],
      },
    },
    interests: {
      type: [String],
      enum: [
        ...Object.values(INTEREST_TYPE),
      ],
      default: [],
    },
    language: {
      type: String,
    },
    preferred_chat_language: {
      type: String,
    },
    meet_prefer: {
      type: String,
      enum: Object.values(MEET_PREFER_TYPE),
    },
    vibe: {
      type: String,
      enum: Object.values(VIBE_TYPE),
    },
    free_time: {
      type: String,
      enum: Object.values(FREE_TIME_TYPE),
    },
    mood_today: {
      type: String,
      enum: [
        ...Object.values(MOOD_TYPE),
      ],
    },
    transport_address: {
      type: String,
    },
    transport_location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [],
      },
    },
    preferred_transport: {
      type: String,
      enum: ['Walking', 'driving'],
    },
    maximum_commute_distance: {
      type: Number,
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/z5YHLV9/profile.png',
    },
    verify_image: {
      type: String,
    },
    media: {
      type: String,
    },
    subscription: {
      type: Types.ObjectId,
      ref: 'Subscription',
    },
    about: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'delete'],
      default: 'active',
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verified_badge: {
      type: Boolean,
      default: false,
    },
    profile_mode: {
      type: String,
      enum: Object.values(PROFILE_MODE),
      default: PROFILE_MODE.PUBLIC,
      required: true,
    },
    token: {
      type: String,
    },
    fcmToken: {
      type: String,
      default: null,
    },
    authorization: {
      oneTimeCode: { type: String },
      expireAt: { type: Date },
    },
    google_id_token: {
      type: String,
      select: false,
    },
    auth_provider: {
      type: String,
      enum: Object.values(USER_AUTH_PROVIDER),
      default: USER_AUTH_PROVIDER.LOCAL,
      select: false,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' });
userSchema.index({ transport_location: '2dsphere' });

/* ---------- Static Methods ---------- */

// Check if user exists by ID
userSchema.statics.isExistUserById = async function (id: string) {
  return await this.findById(id);
};

// Check if user exists by email
userSchema.statics.isExistUserByEmail = async function (email: string) {
  return await this.findOne({ email });
};

// Compare passwords
userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
};

/* ---------- Middleware ---------- */

userSchema.pre('save', async function (next) {
  const user = this as IUser;

  // Only check for duplicate on create, not on update
  if (this.isNew) {
    if (user.email) {
      const isExist = await User.exists({ email: user.email });
      if (isExist) {
        return next(
          new ApiError(StatusCodes.BAD_REQUEST, 'Account already exists!'),
        );
      }
    } else if (user.mobile) {
      const isExist = await User.exists({ mobile: user.mobile });
      if (isExist) {
        return next(
          new ApiError(StatusCodes.BAD_REQUEST, 'Account already exists!'),
        );
      }
    }
  }

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
