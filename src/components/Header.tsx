"use client";

import NavLink from "./NavLink";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="mb-8 w-full bg-background-light py-4 text-text">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <nav className="flex gap-8 text-lg">
          <NavLink href="/">Home</NavLink>
          {user && <NavLink href="/todo">Todo App</NavLink>}
          <NavLink href="/about">About</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {user && <UserButton />}
          {user && (
            <SignOutButton>
              <button className="text-text transition-colors hover:text-primary">
                Logout
              </button>
            </SignOutButton>
          )}
        </div>
      </div>
    </header>
  );
}
