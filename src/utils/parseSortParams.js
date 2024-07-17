import { sortedList } from '../constans/constans.js';

const parseSortParams = ({ sortOrder, sortBy }, fieldList) => {
  const parsedSortOrder = sortedList.includes(sortOrder)
    ? sortOrder
    : sortOrder[0];

  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : sortBy[0];

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
export default parseSortParams;
