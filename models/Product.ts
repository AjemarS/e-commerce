import { translit } from "@/lib/utils";
import { Schema, Types, model, models } from "mongoose";

interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  description: string;
  category: Types.ObjectId;
  image: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

ProductSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = translit(this.name);
    let uniqueSlug = slug;
    let counter = 1;

    const existing = await Product.findOne({ slug: uniqueSlug });
    while (existing) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  return next();
});

export const Product = models.Product || model("Product", ProductSchema);
