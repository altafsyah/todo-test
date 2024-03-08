"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateTodoMutation } from "@/lib/services/todos";
import { useState } from "react";

export default function AddTaskModal() {
  const [createTodo, result] = useCreateTodoMutation();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  async function handleAddTask() {
    try {
      createTodo({
        title: title,
      });
      console.log(result);
      if (result.isSuccess) {
        toast({
          title: "Task added",
          description: "Task has been added successfully",
          duration: 1000,
        });
      }

      if (result.isError) {
        toast({
          title: "Task not added",
          description: "Task has not been added successfully",
          duration: 1000,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Task not added",
        description: "Task has not been added successfully",
        duration: 1000,
      });
    } finally {
      if (result.isSuccess) {
        setOpen(false);
        setTitle("");
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" className="mb-4">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] mx-auto">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>
            Please enter the task details below
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
        >
          <Input
            placeholder="Task name"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button
            variant="default"
            className="mt-5 w-full"
            disabled={result.isLoading}
            type="submit"
          >
            {result.isLoading ? "Adding..." : "Add Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
