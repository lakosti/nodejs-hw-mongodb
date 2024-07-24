import {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePagination from '../utils/parsePagination.js';
import parseSortParams from '../utils/parseSortParams.js';
import { fieldList } from '../constans/constans.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';

export const getContactsController = async (req, res) => {
  // const { _id: userId } = req.user;

  const { page, perPage } = parsePagination(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, fieldList);
  const filter = parseContactsFilterParams(req.query);
  // const filter = { ...parseContactsFilterParams(req.query), userId };

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  console.log(data);
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  console.log(data);
  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    data,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res) => {
  const data = await createContact(req.body);
  console.log(req.body);

  res.status(201).json({
    status: 201,
    data,
    message: 'Successfully created a contact!',
  });
};
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContact({ _id: contactId }, req.body);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await deleteContact({
    _id: contactId,
  });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json();
};
