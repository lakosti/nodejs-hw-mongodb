import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constans/constans.js';
import { mongooseSaveError, setUpdateSettings } from '../contact/hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', mongooseSaveError);

const User = model('user', userSchema);

export default User;
