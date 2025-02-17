"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import React from "react";
import { useRouter } from "next/navigation";
import type { Schema } from "../../amplify/data/resource";

type Item = Schema["Post"]["type"];
const Post = ({
  post,
  onDelete,
  idx,
  isSignedIn,
}: {
  post: Pick<Item, "title" | "description" | "id">;
  onDelete: (id: string) => void;
  idx: number;
  isSignedIn: boolean; // ✅ Fixed typo and type
}) => {
  const router = useRouter();

  return (
    <div>
      <Card className="cursor-pointer">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>

        <CardFooter>
          {isSignedIn && (
            <Button onClick={() => onDelete(post.id)}>Delete</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
