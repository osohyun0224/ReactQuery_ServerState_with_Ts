import type { NextPage } from "next";
import { useQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";
import Link from "next/link";


interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}


const getPosts = async () => {
  const { data } = await axios.get<Post[]>("http://localhost:5000/posts");
  return data;
};


const PaginatedQueries: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>("posts", getPosts, {
    staleTime: 3 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: false,
  });


  if (isError) {
    return <div>{error.message}</div>;
  }


  return (
    <>
      <nav style={{ display: "flex" }}>
        <Link href="/parallel">
          <a style={{ marginRight: "1rem" }}>Parallel Queries Page</a>
        </Link>


        <Link href="/dependent">
          <a style={{ marginRight: "1rem" }}>Dependent Queries Page</a>
        </Link>


        <Link href="/paginated">
          <a style={{ marginRight: "1rem" }}>Paginated Queries Page</a>
        </Link>
      </nav>


      <br />


      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts?.map((post) => (
            <Fragment key={post.id}>
              <br />
              <Link href={`/post/${post.id}`}>
                <a>
                  <div>id: {post.id}</div>
                  <div>제목: {post.title}</div>
                  <div>작성자: {post.author}</div>
                  <div>내용: {post.description.slice(0, 100)}...</div>
                </a>
              </Link>
              <br />
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};


export default PaginatedQueries;