"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function onDeletePost(id: string) {
  const { data, errors } = await cookieBasedClient.models.Post.delete({
    id,
  });
  console.log("data deleted", data, errors);
  revalidatePath("/");
}

export async function createPost(formData: FormData) {
  const { data } = await cookieBasedClient.models.Post.create({
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
  });
  console.log("create post data", data);
  redirect("/");
}
