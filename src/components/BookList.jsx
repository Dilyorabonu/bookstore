// // src/components/BookList.js
// "use client";
// import { useSelector } from "react-redux";
// import { BookCard } from "./BookCard";

// export function BookList() {
//   const books = useSelector((state) => state.books);

//   return (
//     <section className="py-10 container px-5">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {books.length > 0 ? (
//           books.map((book) => <BookCard key={book.id} book={book} />)
//         ) : (
//           <p>No books available</p>
//         )}
//       </div>
//     </section>
//   );
// }
