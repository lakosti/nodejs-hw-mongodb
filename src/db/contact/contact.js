import { Schema, model } from 'mongoose';
import { typeList } from '../../constans/constans.js';
import { setUpdateSettings, mongooseSaveError } from './hooks.js';

const constactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      optional: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
    },
    userId: { type: String, required: true, ref: 'users' },
  },
  { versionKey: false, timestamps: true },
);

constactSchema.pre('findOneAndUpdate', setUpdateSettings);
constactSchema.post('findOneAndUpdate', mongooseSaveError);
constactSchema.post('save', mongooseSaveError);

const Contact = model('contact', constactSchema);

export default Contact;
