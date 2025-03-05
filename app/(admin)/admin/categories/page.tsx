import { auth, signIn } from "@/lib/auth";

interface Category {
  name: string;
  description: string;
}

export default async function CategoriesPage() {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return { status: 403, body: { message: "You are not supposed to be here. Get out!" } };
  }

  const categories: Category[] = await fetch("http://localhost:3000/api/categories").then((res) =>
    res.json()
  );

  return (
    <div className="container">
      {categories.map((category, index) => (
        <div key={index}>{category.name}</div>
      ))}
    </div>
  );
}
