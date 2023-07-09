import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
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


const QueryClientt: NextPage = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>("posts", getPosts, {
    refetchOnWindowFocus: false,
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


        <Link href="/infinite">
          <a style={{ marginRight: "1rem" }}>Infinite Queries Page</a>
        </Link>


        <Link href="/todos">
          <a style={{ marginRight: "1rem" }}>Mutation Page</a>
        </Link>
      </nav>


      <br />


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


export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default QueryClientt;
