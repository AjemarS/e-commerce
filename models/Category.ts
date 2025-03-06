import { translit } from "@/lib/utils";
import { Schema, model, models } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
});

CategorySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = translit(this.name);
    let uniqueSlug = slug;
    let counter = 1;

    const existing = await Category.findOne({ slug: uniqueSlug });
    while (existing) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  next();
});

export const Category = models.Category || model("Category", CategorySchema);
