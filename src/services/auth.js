import User from '../db/user/User.js';
import Session from '../db/session/Session.js';
import { randomBytes } from 'node:crypto';
import { hashValue } from '../utils/hash.js';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constans/constans.js';

export const findSession = (filter) => Session.findOne(filter);

export const createSession = async (userId) => {
  await Session.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const findUser = (filter) => User.findOne(filter);
//реєструємо юзера і хешуємо пароль
export const register = async (data) => {
  const { password } = data;
  const hashedPassword = await hashValue(password, 10);

  return User.create({ ...data, password: hashedPassword });
};

export const deleteSession = (filter) => Session.deleteOne(filter);
