"use client";

import NavLink from "./NavLink";
import { SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();


  return (
    <header className="w-full py-4 mb-8 bg-background-light text-text">
      <div className="flex justify-between items-center px-8 mx-auto max-w-7xl">
        <nav className="flex gap-8 text-lg">
          <NavLink href="/">Home</NavLink>
          {user && <NavLink href="/todo">Todo App</NavLink>}
          {user && <SignOutButton>
            <button className="text-text hover:text-primary transition-colors">Logout</button>
          </SignOutButton>}
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
