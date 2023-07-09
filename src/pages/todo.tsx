import type { NextPage } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from "react";


interface Todo {
  id: number;
  todo: string;
  done: boolean;
}


const getTodos = async () => {
  const { data } = await axios.get<Todo[]>("http://localhost:5000/todos");
  return data;
};


const addTodo = async (todo: string) => {
  const { data } = await axios.post<Todo>("http://localhost:5000/todos", {
    todo,
    done: false,
  });


  return data;
};


const TodosPage: NextPage = () => {
  const [todo, setTodo] = useState("");


  const queryClient = useQueryClient();


  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>("todos", getTodos, {
    refetchOnWindowFocus: false,
  });

// useMutation은 useQuery와는 다르게 query key를 첫 번째 인자로 갖지 않는다. 대신 첫 번째 인자로 query function이 들어간다. 
//그리고 두 번째 인자로 옵션이 들어갑니다. 여기서는 onSuccess 메서드가 들어감.
const { mutate } = useMutation(addTodo, {
  onSuccess: (data) => {
    //   queryClient.invalidateQueries("todos");
    queryClient.setQueryData<Todo[]>("todos", (oldData) => {
      if (!oldData) {
        return [];
      }

      return [...oldData, { id: data.id, todo: data.todo, done: false }];
    });
  },
});



  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(todo);
      setTodo("");
    },
    [mutate, todo]
  );


  if (isError) {
    return <div>{error.message}</div>;
  }


  return (
    <>
      <form onSubmit={onSubmit}>
        <label>할 일: </label>
        <input
          type="text"
          value={todo}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTodo(e.target.value)
          }
        />
        <button type="submit">작성</button>
      </form>


      <br />


      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          todos?.map((todo) => (
            <Fragment key={todo.id}>
              <div>ID: {todo.id}</div>
              <div>할 일: {todo.todo}</div>


              <br />
              <hr />
            </Fragment>
          ))
        )}
      </div>
    </>
  );
};


export default TodosPage;