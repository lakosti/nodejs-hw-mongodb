// name - string, required
// phoneNumber - string, required
//! email - email, optional
// isFavourite - boolean, default false
// contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’
// createdAt - дата створення (timestamps: true)
// updatedAt - дата оновлення (timestamps: true)

import { Schema, model } from 'mongoose';

const constactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String, //!
    optional: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
    default: 'personal',
  },
  createdAt: {
    type: String,
    timestamps: true,
  },
  updatedAt: {
    type: String,
    timestamps: true,
  },
});

const Contact = model('contact', constactSchema);

export default Contact;
