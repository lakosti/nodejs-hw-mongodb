import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

import express from 'express';
import isValidId from '../middleware/isValidId.js';

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

contactsRouter.get('/', ctrWrapper(getContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrWrapper(getContactByIdController),
);
contactsRouter.post('/', ctrWrapper(createContactController));
contactsRouter.patch(
  '/:contactId',
  isValidId,
  ctrWrapper(updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrWrapper(deleteContactController),
);

export default contactsRouter;
