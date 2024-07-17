import Contact from '../db/contact/contact.js';
import calcPages from '../utils/calcPages.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder,
  sortBy,
}) => {
  const skip = (page - 1) * perPage;
  const data = await Contact.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Contact.countDocuments();

  const { totalPages, hasPreviousPage, hasNextPage } = calcPages({
    total: totalItems,
    perPage,
    page,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (data) => Contact.create(data);

export const updateContact = (filter, data, options = {}) =>
  Contact.findOneAndUpdate(filter, data, { new: true, ...options });

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
