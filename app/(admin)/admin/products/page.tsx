import { auth, signIn } from "@/lib/auth";
import { IProduct } from "@/models/Product";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default async function ProductsPage() {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  if (session?.user.role !== "admin") {
    return { status: 403, body: { message: "You are not supposed to be here. Get out!" } };
  }

  const products: IProduct[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
    .then((res) => res.json())
    .catch((error) => console.error("Failed to fetch products: ", error));

  return (
    <div className="container flex flex-col">
      <div className="w-full flex items-center justify-end py-3 px-2">
        <form action="">
          <Button className="mx-2" type="submit">
            Refresh
            <RefreshCcw />
          </Button>
        </form>
        <Button asChild>
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/admin/products/add`}>Add</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
