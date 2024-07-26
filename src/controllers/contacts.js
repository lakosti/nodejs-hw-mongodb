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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import env from '../utils/env.js';

export const getContactsController = async (req, res) => {
  const userId = req.user._id;

  const { page, perPage } = parsePagination(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, fieldList);
  const filter = { ...parseContactsFilterParams(req.query), userId };

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const data = await getContactById(contactId, userId);

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
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const data = await createContact({ ...req.body, userId, photo: photoUrl });

  res.status(201).json({
    status: 201,
    data,
    message: 'Successfully created a contact!',
  });
};
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const data = await updateContact(contactId, {
    ...req.body,
    photo: photoUrl,
    userId,
  });

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
  const userId = req.user._id;
  const data = await deleteContact({
    _id: contactId,
    userId,
  });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json();
};
