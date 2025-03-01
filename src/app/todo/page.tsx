"use client";

import cat from "@/assets/cat.gif";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

interface Todo {
  date: ReactNode;
  id: string;
  text: string;
  category: string;
  completed: boolean;
  importanceLevel: string;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      toast.error('Failed to load todos');
    }
  };

  const addTodoWithDate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const todoText = form.elements.namedItem("todoText") as HTMLInputElement;
    const todoCategory = form.elements.namedItem("todoCategory") as HTMLInputElement;
    const todoDate = form.elements.namedItem("todoDate") as HTMLInputElement;

    if (!todoCategory || !todoText || !todoDate || !user) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: todoText.value,
          category: todoCategory.value,
          date: todoDate.value ? new Date(todoDate.value).toISOString() : null,
          importanceLevel: 'low',
        }),
      });

      if (!response.ok) throw new Error('Failed to add todo');
      
      const newTodo = await response.json();
      toast.success("Todo added successfully!");
      setTodos((prev) => [...prev, newTodo]);
      
      // Reset form
      todoText.value = "";
      todoCategory.value = "";
      todoDate.value = "";
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  const toggleTodoCompletion = async (id: string, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed: !completed }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo,
        ),
      );
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete todo');
      
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <main className="mx-auto max-w-4xl flex-1 p-6">
        <div className="mb-8 flex items-center gap-4">
          <Image unoptimized
            src={cat}
            alt="Cat Missing camera"
            className="h-24 w-24 rounded-full border-4 border-primary"
          />
          <h1 className="text-4xl font-bold">My Todos</h1>
        </div>

        {/* Todo Form */}
        <form
          className="mb-8 space-y-4 rounded-lg bg-background-light p-6 shadow-lg"
          onSubmit={addTodoWithDate}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="What you gotta do?"
              name="todoText"
              className="border-gray-600 w-full rounded-md border bg-background px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              placeholder="Category"
              name="todoCategory"
              className="border-gray-600 w-full rounded-md border bg-background px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="date"
              name="todoDate"
              className="border-gray-600 w-full rounded-md border bg-background px-4 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-white w-full rounded-md bg-primary px-4 py-2 font-semibold transition-colors hover:bg-primary-hover"
            >
              Add
            </button>
          </div>
        </form>

        {/* Todo List */}
        {todos.length > 0 && (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`animate-fade-in flex items-center gap-4 rounded bg-background-light p-4 ${todo.completed ? "line-through" : ""}`}
              >
                <span className="flex-1">{todo.text}</span>
                <span className="animate-fade-in rounded-full bg-primary/20 px-2 py-1 text-text-muted">
                  {todo.category}
                </span>
                <span className="animate-fade-in rounded-full bg-primary/20 px-2 py-1 text-text-muted">
                  {todo.date}
                </span>
                <button
                  onClick={() => toggleTodoCompletion(todo.id, todo.completed)}
                  className="rounded-full bg-primary px-2 py-1 text-text-muted transition-colors hover:bg-primary-hover"
                >
                  ✓
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white hover:bg-red-600 rounded-full px-2 py-1 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}
