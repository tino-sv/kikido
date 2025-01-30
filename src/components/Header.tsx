"use client";

import Link from "next/link";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <header className="w-full py-4 mb-8 bg-gray-800 text-white">
      <div className="flex justify-between items-center px-8 mx-auto max-w-7xl">
        <nav className="flex gap-8 text-lg">
          <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
          <Link href="/todo" className="hover:text-teal-400 transition-colors">Todo App</Link>
          <Link href="/logout" className="hover:text-teal-400 transition-colors">Logout</Link>
        </nav>
      </div>
    </header>
  );
}
