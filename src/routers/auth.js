import { Router } from 'express';

import ctrWrapper from '../utils/ctrWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userLoginSchema,
  userRegisterSchema,
} from '../validation/user-schema.js';

import { loginController, registerController } from '../controllers/auth.js';

const auth = Router();

auth.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrWrapper(registerController),
);
auth.post('/login', validateBody(userLoginSchema), ctrWrapper(loginController));

export default auth;
