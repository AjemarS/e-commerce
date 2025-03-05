import AddProductForm from "@/components/forms/AddProductForm";
import { auth, signIn } from "@/lib/auth";

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return { status: 403, body: { message: "You are not supposed to be here. Get out!" } };
  }

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="w-1/3">
        <AddProductForm />
      </div>
    </div>
  );
}
