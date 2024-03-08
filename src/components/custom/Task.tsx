"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetTodosQuery } from "@/lib/services/todos";
import { Skeleton } from "../ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { ScrollArea } from "../ui/scroll-area";

function TaskCard({ title, completed }: Todo) {
  return (
    <Card className="min-w-80 mb-3">
      <CardContent className="py-3 flex justify-between">
        <div>
          <Badge variant="default">{completed ? "Completed" : "To Do"}</Badge>
          <h3 className="text-base font-medium mt-2">{title}</h3>
        </div>
        <Button variant="ghost" className="flex flex-col gap-[2px]">
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TaskList({
  tasks,
  toggleNext,
  togglePrev,
  start,
}: {
  tasks: Todo[] | undefined;
  toggleNext: () => void;
  togglePrev: () => void;
  start: number;
}) {
  const { isLoading, isFetching } = useGetTodosQuery(start.toString());

  return (
    <div className="flex flex-col gap-4">
      {tasks && !isLoading && !isFetching && (
        <ScrollArea className="h-[450px]">
          {tasks.map((todo, index: number) => (
            <TaskCard
              key={`task_${index}`}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ScrollArea>
      )}

      {isLoading ||
        (isFetching && (
          <div className="flex flex-col gap-4 min-w-80">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ))}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                togglePrev();
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleNext();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
