import Blog from "@/components/Blog/Blog";

const url = process.env.url;
export const fetchBlogs = async () => {
  const res = await fetch(`${url}/api/blogs/list`);
  const response = await res.json();
  return response;
};

export default async function page() {
  const blog = await fetchBlogs();
  // const meta = blog;
  // console.log(meta, "menu");
  return (
    <>
      <Blog blog={blog} />
    
    </>
  );
}
