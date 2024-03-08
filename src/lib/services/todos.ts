import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export type Todo = {
  userId: number | undefined;
  id: number | undefined;
  title: string;
  completed: boolean;
};

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], string>({
      query: (start: string) => `?_start=${start}&_limit=10`,
    }),
    createTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: {
          title: data.title,
          completed: false,
          userId: 1,
        },
      }),
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation } = todosApi;
