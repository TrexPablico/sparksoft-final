import { cookieBasedClient } from "@/utils/amplify-utils";

export default async function Home() {
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "description", "id"], // Include the category in the selectionSet
    authMode: "userPool",
  });

  console.log("posts", posts);

  // Filter out the null values from the posts array
  const validPosts = posts?.filter((post) => post !== null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-8 row-start-2 items-center sm:items-start">
        <h1 className="col-span-full text-center sm:text-left">Hello Trex</h1>
        {validPosts?.map((post, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg overflow-hidden w-full"
          >
            <div className="px-4 py-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-700">{post.description}</p>
            </div>
            <div className="px-4 py-2 bg-gray-100 text-right">
              <a href="#" className="text-indigo-500 hover:underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
