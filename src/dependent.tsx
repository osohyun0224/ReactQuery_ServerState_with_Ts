import axios from "axios";
import type { NextPage } from "next";
import { QueryFunctionContext, useQuery } from "react-query";


interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}


interface User {
  nickname: string;
  email: string;
  postId: number;
}


const getPost = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(
    `http://localhost:5000/posts/${queryKey[1]}`
  );
  return data;
};

//post 데이터를 가져오는 쿼리
const getUser = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<User>(
    `http://localhost:5000/users/${queryKey[1]}`
  );
  return data;
};


const DependentQueries: NextPage = () => {
  const { data: user } = useQuery(["user", "kkiri@example.com"], getUser);
  //user객체의 postId가 존재하면 enabled가 true이고, postId가 존재하지 않으면 false임을 알 수 있음
  const { data: post } = useQuery(["post", user?.postId], getPost, {
    enabled: !!user?.postId,
  });


  console.log({ user });
  console.log({ post });


  return <div>Dependent Queries Page</div>;
};

/*정리: 첫 번째 useQuery가 실행되고, 요청이 성공적으로 완료되었을 경우에 user 객체가 존재

2) 따라서 두 번째 useQuery의 enabled가 true 가 되면서 요청을 시작

두 번째 useQuery는 첫 번째 useQuery에 의존적이기 때문에 Dependent Queries

이는 동기적으로 요청을 수행해야 할 때 유용하게 사용될 수 있음.
*/
export default DependentQueries;
