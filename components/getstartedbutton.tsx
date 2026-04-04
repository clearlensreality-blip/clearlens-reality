"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login"); // <-- FIXED
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
    >
      Get Started
    </button>
  );
}
