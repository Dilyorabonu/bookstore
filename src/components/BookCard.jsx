// // src/components/BookCard.js
// "use client";
// import { useDispatch } from "react-redux";
// import { addBookToCart } from "@/lib/redux-toolkit/slices/cart";
// import { Button } from "./ui/button";

// export function BookCard({ book }) {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addBookToCart(book));
//   };

//   return (
//     <div className="p-4 border rounded-lg">
//       <h3 className="text-xl font-bold">{book.title}</h3>
//       <p>{book.author}</p>
//       <p>{book.genre}</p>
//       <p>${book.price}</p>
//       <Button onClick={handleAddToCart}>Add to Cart</Button>
//     </div>
//   );
// }
