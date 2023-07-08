import axios from "axios";
import type { NextPage } from "next";
import { QueryFunctionContext, useQuery } from "react-query";

//parallel query란 여러 개의 쿼리를 다룬다.
//query key로 배열을 사용했다는 것과 getPost의 매개변수로 query를 넣어주었음.
//쿼리가 비활성화된 상태를 말하며, 5분(기본값)동안 캐싱된 상태로 보관하며, 5분이 지나면 아래와 같이 상태가 삭제됨.

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}


const getPost = async (query: QueryFunctionContext) => {
  console.log(query);
  const { data } = await axios.get<Post>(
    `http://localhost:5000/posts/${query.queryKey[1]}`
  );
  return data;
};


const ParallelQueriesPage: NextPage = () => {
  useQuery<Post, Error>(["post", 1], getPost);
  useQuery<Post, Error>(["post", 2], getPost);
  useQuery<Post, Error>(["post", 3], getPost);


  return <div>Parallel Queries Page</div>;
};


export default ParallelQueriesPage;