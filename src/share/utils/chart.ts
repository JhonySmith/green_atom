export const getCategories = (from: number, to: number) => {
  const categories = [];
  for (let i = from; i <= to; i++) {
    categories.push(i);
  }

  return categories;
};
