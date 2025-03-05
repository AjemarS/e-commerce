import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";

export async function POST(req: Request, res: Response) {
  await connectDB();

  try {
    const { name } = await req.json();

    if (!name) {
      return Response.json({ message: "All fields are required." });
    }

    const category = await Category.create({ name });
    return Response.json(category);
  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}

export async function GET(req: Request, res: Response) {
  await connectDB();

  try {
    const products = await Category.find().sort({ createdAt: -1 });
    return Response.json(products);
  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}
