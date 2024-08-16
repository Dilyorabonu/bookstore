"use client";
import BookCard from "@/components/BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="text-center">No books available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
