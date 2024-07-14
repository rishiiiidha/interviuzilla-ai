"use client";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const  user= useUser();

  if (!user.isLoaded || !user.isSignedIn) {
    return null;
  }
  const username = (user.user.firstName || "") + " " +  (user.user.lastName || "")
  return <div>Hello, {username } welcome to Clerk</div>;
}
