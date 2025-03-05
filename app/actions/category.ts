"use server";

export const getCategories = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/categories`);
  return res.json();
};
