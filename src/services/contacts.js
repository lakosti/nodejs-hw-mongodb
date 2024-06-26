import Contact from '../db/contact/contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);
