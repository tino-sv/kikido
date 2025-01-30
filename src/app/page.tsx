"use client";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
   const { user } = useUser();
 
   return (
     <div className="min-h-screen flex flex-col bg-background text-text">
       <main className="flex-1 max-w-4xl mx-auto p-6 text-center">
         <h1 className="text-4xl mb-6 font-extrabold">
           Welcome to Kiki's Todo App
         </h1>
 
         {user ? (
           <div className="rounded-lg bg-background-light p-6 shadow-lg mb-8">
             <p className="text-xl mb-2">Welcome, {user.firstName}!</p>
             <p className="text-text-muted mb-4">Ready to manage your tasks?</p>
             <Link href="/todo">
               <button
                 className="bg-primary px-8 py-3 rounded-lg font-bold 
                 text-white transition-colors hover:bg-primary-hover"
               >
                 Go to Todo App
               </button>
             </Link>
           </div>
         ) : (
           <div className="rounded-lg bg-background-light p-6 shadow-lg">
             <p className="text-lg mb-4">
               Please log in or sign up to manage your todos
             </p>
             <div className="flex gap-4 justify-center">
               <SignInButton>
                 <button
                   className="bg-primary px-6 py-3 rounded-lg font-bold 
                   text-white transition-colors hover:bg-primary-hover"
                 >
                   Login
                 </button>
               </SignInButton>
               <SignUpButton>
                 <button
                   className="bg-primary px-6 py-3 rounded-lg font-bold 
                   text-white transition-colors hover:bg-primary-hover"
                 >
                   Sign Up
                 </button>
               </SignUpButton>
             </div>
           </div>
         )}
       </main>
     </div>
   );
 }
 