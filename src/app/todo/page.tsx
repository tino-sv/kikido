"use client";

import cat from "@/assets/cat.gif";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
         setTodos([]);
      }
   }, [user]);

   const addTodoWithDate = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const todoText = form.elements.namedItem("todoText") as HTMLInputElement;
      const todoCategory = form.elements.namedItem("todoCategory") as HTMLInputElement;
      const todoDate = form.elements.namedItem("todoDate") as HTMLInputElement;

      if (!todoCategory || !todoText || !todoDate || !user) return;

      const newTodo = {
         user_id: user?.id,
         text: todoText.value,
         category: todoCategory.value,
         completed: false,
         date: todoDate.value ? new Date(todoDate.value).toISOString().split('T')[0] : null,
         importanceLevel: '1'
      };

      const id = generateUniqueId();
      if (id !== undefined) {
         const todoWithId: Todo = { ...newTodo, id };
         toast.success('Todo added successfully!');
         setTodos(prev => [...prev, todoWithId]);
         todoText.value = "";
         todoCategory.value = "";
         todoDate.value = "";
      } else {
         toast.error('Failed to generate unique ID for the todo.');
      }
   };

   const toggleTodoCompletion = (id: string, completed: boolean) => {
      setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
      toast.success('Todo updated successfully!');
   };

   const deleteTodo = (id: string) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Todo deleted successfully!');
   };

   const generateUniqueId = () => {
      return Math.random().toString(36).substr(2, 9);
   };

   return (
      <div className="min-h-screen flex flex-col bg-background text-text">
        <main className="flex-1 max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={cat}
              alt="Cat Missing camera"
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            <h1 className="text-4xl font-bold">My Todos</h1>
          </div>
  
          {/* Todo Form */}
          <form
            className="space-y-4 rounded-lg bg-background-light p-6 shadow-lg mb-8"
            onSubmit={addTodoWithDate}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="What you gotta do?"
                name="todoText"
                className="w-full rounded-md border border-gray-600 bg-background px-4 py-2 
                text-text focus:border-primary focus:outline-none focus:ring-2 
                focus:ring-primary/50"
              />
              <input
                type="text"
                placeholder="Category"
                name="todoCategory"
                className="w-full rounded-md border border-gray-600 bg-background px-4 py-2 
                text-text focus:border-primary focus:outline-none focus:ring-2 
                focus:ring-primary/50"
              />
              <input
                type="date"
                name="todoDate"
                className="w-full rounded-md border border-gray-600 bg-background px-4 py-2 
                text-text focus:border-primary focus:outline-none focus:ring-2 
                focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold 
                transition-colors hover:bg-primary-hover"
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
                  className={`p-4 rounded bg-background-light flex items-center gap-4 
                  ${todo.completed ? "line-through" : ""}`}
                >
                  <span className="flex-1">{todo.text}</span>
                  <span className="px-2 py-1 rounded-full bg-primary/20 text-text-muted">
                    {todo.category}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-primary/20 text-text-muted">
                    {todo.date}
                  </span>
                  <button
                    onClick={() => toggleTodoCompletion(todo.id, todo.completed)}
                    className="px-2 py-1 rounded-full bg-primary text-text-muted 
                    hover:bg-primary-hover transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 py-1 rounded-full bg-red-500 text-white 
                    hover:bg-red-600 transition-colors"
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



