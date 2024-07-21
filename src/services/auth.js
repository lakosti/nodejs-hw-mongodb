import User from '../db/user/User.js';
import { hashValue } from '../utils/hash.js';

export const findUser = (filter) => User.findOne(filter);

export const register = async (data) => {
  const { password } = data;
  const hashedPassword = await hashValue(password, 10);

  return User.create({ ...data, password: hashedPassword });
};
