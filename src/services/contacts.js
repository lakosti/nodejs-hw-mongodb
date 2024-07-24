import Contact from '../db/contact/contact.js';
import calcPages from '../utils/calcPages.js';

export const getContacts = async ({
  filter = {},
  page,
  perPage,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }
  if (filter.contactType) {
    contactsQuery.where('type').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const data = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await Contact.find().merge(contactsQuery).countDocuments();

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

export const getContactById = (filter) => Contact.findById(filter);

export const createContact = (data) => Contact.create(data);

export const updateContact = (filter, data, options = {}) =>
  Contact.findOneAndUpdate(filter, data, { new: true, ...options });

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
