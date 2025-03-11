import { connectDB } from "@/lib/mongodb";
import { translit } from "@/lib/utils";
import { Schema, Types} from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  stock: number;
  description?: string;
  category: Types.ObjectId;
  image?: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

ProductSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const slug = translit(this.name);
    let uniqueSlug = slug;
    let counter = 1;

    const existing = await isSlugUnique(uniqueSlug);
    while (existing) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  return next();
});

export const getProductModel = async () => {
  const db = await connectDB("shop");
  return db.models.Product || db.model("Product", ProductSchema);
};

const isSlugUnique = async (uniqueSlug: string) => {
  const Product = await getProductModel();
  return Product.findOne({ slug: uniqueSlug });
};
