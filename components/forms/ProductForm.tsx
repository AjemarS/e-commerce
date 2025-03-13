"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import AddCategoryForm from "./CategoryForm";
import SettingsPopover from "./SettingsPopover";
import { ICategory, IProduct } from "@/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().max(50, { message: "Too many characters" }),
  price: z.coerce.number().min(0, { message: "Price can't be thaat low" }),
  stock: z.coerce
    .number()
    .min(0, { message: "It's a violation a laws of physics :). Stock can't be negative" }),
  image: z.string().max(200).optional(),
  category: z.string().max(50),
  description: z.string().max(200).optional(),
});

export default function ProductForm({ product }: { product?: IProduct }) {
  const [isResetFormOnSubmit, setIsResetFormOnSubmit] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      stock: product?.stock,
      description: product?.description,
      // Can't describe image, because browser don't allow that
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = formSchema.safeParse(values);

    if (!result.success) toast(result.error.message);

    const res = await fetch(`/api/products`, {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: product
        ? JSON.stringify({
            name: result.data?.name,
            slug: product.slug,
            price: result.data?.price,
            stock: result.data?.stock,
            image: result.data?.image,
            category: result.data?.category,
            description: result.data?.description,
          })
        : JSON.stringify({
            name: result.data?.name,
            price: result.data?.price,
            stock: result.data?.stock,
            image: result.data?.image,
            category: result.data?.category,
            description: result.data?.description,
          }),
    });

    if (res.ok) {
      const data = await res.json();

      toast(`Product ${product ? "updated" : "created"} successfully`);
      if (product) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/products/${data.slug}`);
      } else if (isResetFormOnSubmit) form.reset();
    } else {
      alert(`Error ${product ? "updating" : "creating"} product. Please try again.`);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <SettingsPopover value={isResetFormOnSubmit} onChange={setIsResetFormOnSubmit} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    {...field}
                    onChange={(value) => field.onChange(value.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Stock"
                    type="number"
                    {...field}
                    onChange={(value) => field.onChange(value.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image" type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <div className="flex justify-between items-center">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"Choose a category"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <CirclePlus />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a category</DialogTitle>
                      </DialogHeader>
                      <AddCategoryForm />
                    </DialogContent>
                  </Dialog>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe this product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{product ? "Update" : "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
}
