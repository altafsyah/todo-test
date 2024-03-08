import { Button } from "@/components/ui/button";
import TaskList from "@/components/custom/Task";

import { Todo, todosApi, useGetTodosQuery } from "@/lib/services/todos";
import { InferGetServerSidePropsType } from "next";
import { useState } from "react";
import AddTaskModal from "@/components/custom/add-task";

export default function SSRPage({
  currentDate,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [start, setStart] = useState(1);
  const { data: todos } = useGetTodosQuery(start.toString());

  function toggleNext() {
    setStart(start + 10);
  }

  function togglePrev() {
    if (start > 10) {
      setStart(start - 10);
    }
  }

  return (
    <main className="max-w-[365px] flex min-h-screen flex-col justify-center items-center py-10 px-6 mx-auto">
      <div className="flex justify-between items-start w-full mb-4">
        <h1>{currentDate}</h1>
        <AddTaskModal />
      </div>
      <TaskList
        tasks={todos || data}
        toggleNext={toggleNext}
        togglePrev={togglePrev}
        start={start}
      />
    </main>
  );
}

export async function getServerSideProps() {
  const currentDate = new Date();
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_start=1&_limit=10",
  );
  const data: Todo[] = await response.json();
  return {
    props: {
      data,
      currentDate: currentDate.toLocaleTimeString(),
    },
  };
}
