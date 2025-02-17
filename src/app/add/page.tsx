"use client";

import React, { useState } from "react";
import { createPost } from "../_actions/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validateForm = () => {
    let newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (errors.description)
      setErrors((prev) => ({ ...prev, description: undefined }));
  };

  const handleCategoryChange = (value: string) => setCategory(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", description);
    postData.append("category", category);

    console.log("Submitting post:", Object.fromEntries(postData.entries())); // Debugging
    await createPost(postData);

    setTitle("");
    setDescription("");
    setCategory("");
    setErrors({});
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="p-4 max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-full">
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="w-full">
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Add Description"
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <Button type="submit" className="text-white bg-blue-500 rounded p-4">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPost;
