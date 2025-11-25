import { YEAR_END, YEAR_START } from "../../app/appConfig";

export const getCategories = () => {
  const categories = [];
  for (let i = YEAR_START; i <= YEAR_END; i++) {
    categories.push(i);
  }

  return categories;
};
