"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Home() {
   const { user } = useUser();
   return (
      <>
         <div className={`min-h-screen flex flex-col bg-gray-900 text-white`}>
            <main className="flex-1 max-w-4xl mx-auto p-4 text-center">
               <h1 className={`text-4xl mb-8 font-bold`}>Welcome to Kiki's Todo App</h1>
               {user ? (
                  <p className="text-lg">Welcome, {user.firstName}!</p>
               ) : (
                  <div className={`bg-gray-800 p-8 rounded-lg shadow-lg mb-8 text-teal-400`}>
                     <p>Please log in or sign up to manage your todos</p>
                     <div className="flex gap-4 justify-center mt-4">
                        <SignInButton>
                           <button className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors hover:bg-teal-300">
                              Login
                           </button>
                        </SignInButton>
                        <SignOutButton>
                           <button className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors hover:bg-teal-300">
                              Sign Up
                           </button>
                        </SignOutButton>
                     </div>
                  </div>
               )}
            </main>
         </div>
      </>
   );
}
