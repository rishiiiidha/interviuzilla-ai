"use client";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const  user= useUser();

  if (!user.isLoaded || !user.isSignedIn) {
    return null;
  }

  return <div>Hello, {user.user.lastName} welcome to Clerk</div>;
}
