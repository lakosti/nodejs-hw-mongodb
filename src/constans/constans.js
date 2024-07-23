export const typeList = ['work', 'home', 'personal'];

export const sortedList = ['asc', 'desc'];

export const fieldList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;
export const REFRESH_TOKEN_LIFETIME = 30 * 24 * 60 * 60 * 1000;
