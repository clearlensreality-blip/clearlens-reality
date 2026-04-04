"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function GetStartedButton({ children, className }: any) {
  const { isSignedIn } = useUser();
  const router = useRouter();

  function handleClick() {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
