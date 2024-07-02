import Contact from '../db/contact/contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (data) => Contact.create(data);

export const updateContact = (filter, data, options = {}) =>
  Contact.findOneAndUpdate(filter, data, { new: true, ...options });

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
