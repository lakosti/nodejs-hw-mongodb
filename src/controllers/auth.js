import createHttpError from 'http-errors';
import { compareHash } from '../utils/hash.js';
import { createSession, findUser, register } from '../services/auth.js';

export const registerController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const newUser = await register(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUser({ email });

  if (!user) {
    throw createHttpError(404, 'Email not found');
  }

  const comparePassword = await compareHash(password, user.password);

  if (!comparePassword) {
    throw createHttpError(401, 'Password invalid');
  }

  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    await createSession(user._id);

  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  //для видалення старої сесії
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });
};
