import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "@/components/common/ApiLoading";
import { POSTS_URL } from "@/constant/config";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage:number = 20;

  const [posts, setPost] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   

    const fetchData = async () => {
      try {
        const response = await axios.get(
         `${POSTS_URL}/posts`
        );

        setPost(response.data);

        setError(null);
      } catch (err: string | any) {
        setError(err.message);
        setPost([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleRowClick = (post: Post) => {
    navigate(`/post/${post.id}`, {
      state: post,
    });
  };

  const getPagination = () => {
    const pages: (number | string)[] = [];

    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
     
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    pages.push(1);

    if (showLeftDots) {
      pages.push("...");
    }

  
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (showRightDots) {
      pages.push("...");
    }

   
    pages.push(totalPages);

    return pages;
  };

  return (
    <>
      <div className="flex-1 pb-28">
        {loading && <Loading />}
        {error && <p className="text-red-400">Error: {error}</p>}

        <div className="text-amber-50 rounded-3xl bg-slate-600 p-10  border-14 border-slate-700">
          {posts.length > 0 && (
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-xl font-normal text-center text-amber-400">
                    Id
                  </TableHead>
                  <TableHead className="w-20 text-xl font-normal text-center text-amber-400">
                    UserId
                  </TableHead>
                  <TableHead className="w-1/3 text-xl font-normal text-center text-amber-400">
                    Title
                  </TableHead>
                  <TableHead className="w-1/3 text-xl font-normal text-center text-amber-400">
                    Body
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {currentPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    onClick={() => handleRowClick(post)}
                    className="cursor-pointer hover:bg-slate-700 transition"
                  >
                    <TableCell className="w-16 text-center whitespace-nowrap">
                      {post.id}
                    </TableCell>

                    <TableCell className="w-20 text-center whitespace-nowrap">
                      {post.userId}
                    </TableCell>

                    <TableCell className="w-1/3 whitespace-normal text-start break-words">
                      {post.title}
                    </TableCell>

                    <TableCell className="w-1/3 whitespace-normal text-start break-words">
                      {post.body}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 py-4">
        <div className="flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg bg-slate-700 text-amber-50 disabled:opacity-50"
          >
            Prev
          </button>
          {getPagination().map((item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-amber-300 font-bold"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentPage === item
                    ? "bg-amber-400 text-black"
                    : "bg-slate-700 text-amber-50"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg bg-slate-700 text-amber-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
