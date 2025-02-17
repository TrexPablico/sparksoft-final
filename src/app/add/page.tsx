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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const handleCategoryChange = (value: string) => setCategory(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", description);
    postData.append("category", category);
    console.log("Submitting post:", Object.fromEntries(postData.entries())); // Debugging: log the post data
    await createPost(postData);
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="p-4 max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          />
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Add Description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
          />
          <Select
            name="category"
            onValueChange={handleCategoryChange}
            value={category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="public">Public Advisory</SelectItem>
              <SelectItem value="events">Events & Activities</SelectItem>
              <SelectItem value="projects">
                Government Projects & Developments
              </SelectItem>
              <SelectItem value="ordinance">
                Ordinances & Resolutions
              </SelectItem>
              <SelectItem value="employment">
                Employment & Livelihood
              </SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="text-white bg-blue-500 rounded p-4">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddPost;
