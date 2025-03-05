import AddProductForm from "@/components/forms/AddProductForm";
import { auth, signIn } from "@/lib/auth";

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return <div>You are not supposed to be here. Get out!</div>;
  }

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="w-1/3">
        <AddProductForm />
      </div>
    </div>
  );
}
