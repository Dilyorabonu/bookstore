// src/app/not-found.js
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <BookOpenIcon className="w-24 h-24 text-gray-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Oops! Book not found.</h1>
      <p className="text-lg text-gray-600 mb-6">
        We couldn't find the book you're looking for. It may have been moved or
        removed.
      </p>
      <div className="space-x-4">
        <Link href="/">
          <Button variant="solid">Go to Homepage</Button>
        </Link>
        <Link href="/search">
          <Button variant="outline">Search for Books</Button>
        </Link>
      </div>
    </div>
  );
}
