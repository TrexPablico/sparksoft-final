import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "description", "id"], // Include the category in the selectionSet
    authMode: "apiKey",
  });

  console.log("posts", posts);

  // Filter out the null values from the posts array
  const validPosts = posts?.filter((post) => post !== null);

  return (
    <>
      <Hero />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="grid grid-cols-1 sm:grid-cols-3 gap-8 row-start-2 items-center sm:items-start lg:mt-1 mt-[-280px] ">
          <h1 className="col-span-full text-center sm:text-left">Welcome</h1>
          {validPosts?.map(async (post, idx) => {
            const isSignedIn = await isAuthenticated();
            return (
              <Post
                key={idx}
                post={post}
                onDelete={onDeletePost}
                isSignedIn={isSignedIn}
                idx={idx}
              />
            );
          })}
        </main>
      </div>
      <Contact />
      <Footer />
    </>
  );
}
