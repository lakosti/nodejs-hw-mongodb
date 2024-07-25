import { Router } from 'express';

import ctrWrapper from '../utils/ctrWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  resetPwdSchema,
  sendResetEmailSchema,
  userLoginSchema,
  userRegisterSchema,
} from '../validation/user-schema.js';

import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  resetPwdController,
  sendResetEmailController,
} from '../controllers/auth.js';

const auth = Router();

auth.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrWrapper(registerController),
);
auth.post('/login', validateBody(userLoginSchema), ctrWrapper(loginController));
auth.post('/refresh', ctrWrapper(refreshController));
auth.post('/logout', ctrWrapper(logoutController));

auth.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrWrapper(sendResetEmailController),
);
auth.post(
  '/reset-pwd',
  validateBody(resetPwdSchema),
  ctrWrapper(resetPwdController),
);

export default auth;
