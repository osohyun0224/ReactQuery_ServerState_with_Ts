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

/* 고의로 에러 발생
const addTodo = async (todo: string) => {
  const { data } = await axios.post<Todo>("http://localhost:5000/todos123", {
    todo,
    done: false,
  });

  return data;
}; */

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


  const { mutate } = useMutation<
    Todo,
    Error,
    string,
    { previousTodos: Todo[] | undefined }
  >(addTodo, {
    // onMutate는 mutate함수가 호출되면 useMutation의 query function(addTodo)가 실행되기 전에 호출됩니다.
    onMutate: async (newTodo) => {
      //cancelQueries("todos")를 실행하여 혹시 발생할지도 모르는 refetch를 취소하여 Optimistic Update의 데이터를 덮어쓰지 않도록 예방합니다.
      await queryClient.cancelQueries("todos");
      //getQueryData("todos")를 이용하여 서버에 전송한 요청이 잘못되었을 경우를 대비해서 이전 데이터를 저장해둡니다.
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      //setQueryData("todos") 를 이용해서 'todos' 쿼리 키를 갖는 쿼리를 업데이트 해줍니다. 즉, 서버의 응답이 오기 전에 UI를 미리 업데이트 하는 것입니다.
      queryClient.setQueryData<Todo[]>("todos", (oldData) => {
        if (!oldData) {
          return [];
        }

        return [
          //에러가 발생했을 경우 복원할 수 있도록 이전 데이터(previousTodos)를 반환합니다. 이는 onError의 context로 들어갑니다.
          ...oldData,
          { id: oldData.length + 1, todo: newTodo, done: false },
        ];
      });

      return { previousTodos };
    },

    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData("todos", context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos");
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
