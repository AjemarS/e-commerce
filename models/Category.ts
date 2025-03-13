import { connectDB } from "@/lib/mongodb";
import { translit } from "@/lib/utils";
import { Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
});

CategorySchema.pre("save", async function (next) {
  const slug = translit(this.name);

  if (this.slug === slug) return next();

  let uniqueSlug = slug;
  let counter = 1;

  const existing = await isSlugUnique(uniqueSlug);
  while (existing) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  this.slug = uniqueSlug;

  next();
});

export const getCategoryModel = async () => {
  const db = await connectDB("shop");
  return db.models.Product || db.model("Category", CategorySchema);
};

const isSlugUnique = async (uniqueSlug: string) => {
  const Category = await getCategoryModel();
  return !!(await Category.findOne({ slug: uniqueSlug }));
};
