"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BookCard({ book }) {
  return (
    <Card className="hover:shadow-lg transition duration-300">
      <CardHeader>
        <img
          src={book.coverUrl || "/placeholder-image.jpg"}
          alt={book.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="font-semibold text-lg">{book.title}</CardTitle>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.genre}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full mt-2">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
