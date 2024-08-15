"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <div className="items-center justify-center h-screen bg-gray-100 text-center">
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        You will be redirected to the home page shortly.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
      >
        Return Home
      </Link>
    </div>
  );
}
