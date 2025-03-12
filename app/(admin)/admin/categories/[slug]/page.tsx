import AddCategoryForm from "@/components/forms/CategoryForm";
import { auth, signIn } from "@/lib/auth";

export default async function AddCategoriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return <div>You are not supposed to be here. Get out!</div>;
  }

  const { slug } = await params;

  const category = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${slug}`, {
    cache: "no-store",
  }).then(async (res) => {
    const data = await res.json();

    if (data.message) console.error(data.message);

    return data;
  });

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="w-1/3">
        <AddCategoryForm category={category} />
      </div>
    </div>
  );
}
