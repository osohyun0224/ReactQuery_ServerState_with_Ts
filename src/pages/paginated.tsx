import type { NextPage } from "next";
import { QueryFunctionContext, useQuery } from "react-query";
import axios from "axios";
import { Fragment, useState } from "react";


interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}


const getPosts = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post[]>(
    `http://localhost:5000/posts?_limit=2&_page=${queryKey[1]}`
  );
  return data;
};


const PaginatedPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading } = useQuery<Post[], Error>(
    ["paginated", page],
    getPosts,
    //다음 페이지로 이동 시 버튼의 위치가 바뀌는 불편함을 해결하기 위해 리액트 쿼리에서 제공하는 keepPreviousData를 옵션을 사용해 해결함.
    // 실행 후 이전 상태를 유지한 채 페이지가 이동함. 
    {
      keepPreviousData: true,
    }
  );


  return (
    <>
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
            </Fragment>
          ))
        )}
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={page === 5}
        >
          Next Page
        </button>
      </div>
    </>
  );
};


export default PaginatedPage;