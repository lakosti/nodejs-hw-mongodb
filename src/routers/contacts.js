import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

import express from 'express';
import isValidId from '../middleware/isValidId.js';
import validateBody from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contact-schema.js';
import authenticate from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const ctrWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return func;
};

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrWrapper(getContactByIdController),
);
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrWrapper(createContactController),
);
contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  ctrWrapper(updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  ctrWrapper(deleteContactController),
);

export default contactsRouter;
