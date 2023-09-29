"use client";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/types/index";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: UserMenuProps) {
  return (
    <header>
      <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">
        <div>{currentUser?.name}</div>
        <h1>All opinions are my own - Tjsm</h1>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/create">Create</Link>
          {currentUser ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
