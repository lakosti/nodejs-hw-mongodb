import { typeList } from '../constans/constans.js';

const parseBoolean = (value) => {
  const isBoolean = value === 'true' || value === 'false';

  if (!isBoolean) return;

  return value === 'true' ? true : false;
};

const parseContactsFilterParams = ({ type, isFavourite }) => {
  const parsedType = typeList.includes(type) ? type : null;
  const parsedIsFavorite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavorite,
  };
};

export default parseContactsFilterParams;
