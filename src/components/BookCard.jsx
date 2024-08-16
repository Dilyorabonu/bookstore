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
    <Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-lg overflow-hidden">
      <CardHeader className="relative">
        <img
          src={book.coverUrl || "/placeholder-image.jpg"}
          alt={book.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold text-gray-800 shadow">
          ${book.price.toFixed(2)}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="font-bold text-lg text-gray-900">
          {book.title}
        </CardTitle>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <div className="flex items-center space-x-2 mt-1">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-600">
            {book.rating}
          </span>
          <span className="text-sm text-gray-500">({book.stock} in stock)</span>
        </div>
        <p className="text-sm text-gray-500">
          {book.genre} &middot; {book.pages} pages
        </p>
        <p className="text-xs text-gray-400">
          Published by {book.publisher} on{" "}
          {new Date(book.publication_date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {book.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-gray-50">
        <Button variant="outline" className="text-sm font-semibold w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
