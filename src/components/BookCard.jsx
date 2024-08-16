"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@radix-ui/react-icons";

export default function BookCard({ book }) {
  return (
    <Card className="flex flex-col h-full bg-base dark:bg-base-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="relative">
        <img
          src={book.coverUrl || "/placeholder-image.jpg"}
          alt={book.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 right-2 bg-base dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-80 rounded-full px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 shadow">
          ${book.price.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-2">
        <CardTitle className="font-bold text-lg text-gray-900 dark:text-gray-100">
          {book.title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          by {book.author}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {book.rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            ({book.stock} in stock)
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {book.genre} &middot; {book.pages} pages
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Published by {book.publisher} on{" "}
          {new Date(book.publication_date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-base-50 dark:bg-base-900">
        <Button variant="outline" className="w-full text-sm font-semibold">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
