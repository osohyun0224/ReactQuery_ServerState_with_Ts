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


const DependentQueries: NextPage = () => {
  const {
    // posts이라는 현재 쿼리 키를 가진 쿼리가 state 상태임을 확인함
    // state가 처음에는 fresh로 나타나고, 지정 staleTime 기간 동안 fresh 상태를 유지한 다음에 state 상태로 변경됨을 확인함.
    // fresh 상태는 refetch가 일어나지 않는 상태도 fresh 상태일 때 , refetch가 발생하지 않고 stale 상태에서만 발생하는 것을 확인했다.
    // stale에서는 재요청을 해서 데이터를 교체해줘야 하는 상태로 정의
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>("posts", getPosts, {
    staleTime: 5 * 1000,
    refetchOnMount: true, 
    refetchOnWindowFocus: true, 
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
      </nav>

      <Link href="/dependent">
          <a style={{ marginRight: "1rem" }}>Dependent Queries Page</a>
        </Link>
  

      <br />

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts?.map((post) => (
            <Fragment key={post.id}>
              <div>id: {post.id}</div>
              <div>제목: {post.title}</div>
              <div>작성자: {post.author}</div>
              <div>내용: {post.description.slice(0, 100)}...</div>
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};

export default DependentQueries;