import { translit } from "@/lib/utils";
import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
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
  next();
});

export const Product = models.Product || model("Product", ProductSchema);
