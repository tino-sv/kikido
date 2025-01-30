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
      // Load todos from local storage when the component mounts
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
         setTodos(JSON.parse(storedTodos));
      }
   }, []);

   useEffect(() => {
      // Save todos to local storage whenever they change
      localStorage.setItem('todos', JSON.stringify(todos));
   }, [todos]);

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
      <div className={`min-h-screen flex flex-col bg-gray-900 text-white`}>
         <main className="flex-1 max-w-4xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-8">
               <Image src={cat} alt="cat kissing camera" className="w-24 h-24 rounded-full border-4 border-teal-400" />
               <h1 className="text-4xl font-bold">My Todos</h1>
            </div>

            <form className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8" onSubmit={addTodoWithDate}>
               <div className="flex gap-4 mb-4">
                  <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400" type="text" placeholder="What you gotta do?" name="todoText" />
                  <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400" type="text" placeholder="Category" name="todoCategory" />
                  <input className="flex-1 p-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400" type="date" name="todoDate" />
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 p-4 bg-teal-400 text-gray-900 rounded font-bold transition-colors hover:bg-teal-300" type="submit">Add</button>
               </div>
            </form>

            {todos.length > 0 && (
               <ul className="space-y-4">
                  {todos.map((todo) => (
                     <li key={todo.id} className={`p-4 rounded bg-gray-800 flex items-center gap-4 ${todo.completed ? "line-through" : ""}`}>
                        <span className="flex-1">{todo.text}</span>
                        <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.category}</span>
                        <span className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">{todo.date}</span>
                        <button onClick={() => toggleTodoCompletion(todo.id, todo.completed)} className="bg-teal-400 text-gray-900 px-2 py-1 rounded-full">✓</button>
                        <button onClick={() => deleteTodo(todo.id)} className="bg-red-400 text-white px-2 py-1 rounded-full">Delete</button>
                     </li>
                  ))}
               </ul>
            )}
         </main>
         <ToastContainer />
      </div>
   );
}



