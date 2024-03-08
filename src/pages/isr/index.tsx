import TaskList from "@/components/custom/Task";

import { Todo, useGetTodosQuery } from "@/lib/services/todos";
import { useState } from "react";

import AddTaskModal from "@/components/custom/add-task";

export default function ISRPage({
  currentDate,
  data,
}: {
  currentDate: string;
  data: Todo[];
}) {
  const [start, setStart] = useState(1);

  function toggleNext() {
    setStart(start + 10);
  }

  function togglePrev() {
    if (start > 10) {
      setStart(start - 10);
    }
  }

  const { data: todos } = useGetTodosQuery(start.toString());
  return (
    <main className="flex max-w-[365px] mx-auto min-h-screen flex-col justify-center items-center py-10 px-6">
      <div className="w-full flex justify-between items-start">
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

export async function getStaticProps() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_start=1&_limit=10",
  );
  const data: Todo[] = await response.json();
  const currentDate = new Date();
  return {
    props: {
      data,
      currentDate: currentDate.toLocaleTimeString(),
    },
    revalidate: 30,
  };
}
