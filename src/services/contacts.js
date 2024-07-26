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

export const getContactById = (filter) => Contact.findOne(filter);

export const createContact = (data) => Contact.create(data);

export const updateContact = async (contactId, data = {}, userId) => {
  const options = { new: true, includeResultMetadata: true };

  const updated = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    data,
    options,
  );

  if (!updated || !updated.value) return null;

  return {
    contact: updated.value,
    isNew: Boolean(updated?.lastErrorObject?.upsert),
  };
};
export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
