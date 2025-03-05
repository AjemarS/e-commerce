import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function POST(req: Request, res: Response) {
  await connectDB();

  try {
    const { name, price, category, description, image } = await req.json();

    if (!name || !price || !category) {
      return Response.json({ message: "All fields are required." });
    }

    const product = await Product.create({ name, price, category, description, image });
    return Response.json(product);
  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json(products);
  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}
