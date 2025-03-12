"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().max(50),
});

export default function CategoryForm({ category }: { category?: { name: string; slug: string } }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/categories", {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: category
        ? JSON.stringify({
            name: values.name,
            slug: category.slug,
          })
        : JSON.stringify({
            name: values.name,
          }),
    });

    if (res.ok) {
      const data = await res.json();

      toast(`Category ${category ? "updated" : "created"} successfully.`);
      
      if (category) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/categories/${data.slug}`);
      } else {
        form.reset();
      }
    } else {
      alert(`Error ${category ? "updating" : "creating"} category. Please try again.`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={stopPropagate(form.handleSubmit(onSubmit))} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Name" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{category ? "Update" : "Submit"}</Button>
      </form>
    </Form>
  );
}

// Solution for preventing parent's form submission
export function stopPropagate(callback: () => void) {
  return (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
}
