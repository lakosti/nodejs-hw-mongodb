import {
  getContactByIdController,
  getContactsController,
} from '../controllers/contacts.js';

import express from 'express';

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
contactsRouter.get('/:id', ctrWrapper(getContactByIdController));

export default contactsRouter;
