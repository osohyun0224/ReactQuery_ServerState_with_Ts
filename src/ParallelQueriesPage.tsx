import axios from "axios";
import type { NextPage } from "next";
import { QueryFunctionContext, useQueries} from "react-query";

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

//여러 개의 쿼리를 다룰 때, 위에서 처럼 하나씩 useQuery를 호출해도 되지만, React-Query에서는 useQueries를 제공함으로써 동일한 기능을 수행이 가능함을 확인함.
const ParallelQueriesPage: NextPage = () => {
  useQueries([
    { queryKey: ["post", 1], queryFn: getPost },
    { queryKey: ["post", 2], queryFn: getPost },
    { queryKey: ["post", 3], queryFn: getPost },
  ]);

  return <div>Parallel Queries Page</div>;
}; 


export default ParallelQueriesPage;