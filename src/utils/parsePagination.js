const isNumber = (value, defaultValue) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }

  const parsedValue = parseInt(value);

  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }
  return parsedValue;
};

const parsePagination = ({ page, perPage }) => {
  const parsedPage = isNumber(page, 1);
  const parsedPerPage = isNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePagination;
