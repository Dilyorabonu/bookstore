"use client";
import Header from "@/components/Header";
import { axiosClient } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import BookList from "@/components/BookList";

import { Toaster } from "sonner";

function page() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient("/products")
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch books. Please try again later.");
        console.error(err);
      });
  }, []);
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <BookList books={books} />
        )}
      </main>
      <Toaster position="bottom-center" />
    </>
  );
}

export default page;
