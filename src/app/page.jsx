"use client";
import Header from "@/components/Header";
import { axiosClient } from "@/utils/axiosClient";
import { useEffect } from "react";

// import { BookList } from "@/components/BookList";

function page() {
  useEffect(() => {
    axiosClient("/products")
      .then((data) => console.log(data.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Header />
      <main>
        {/* <BookList /> */}
      </main>
    </>
  );
}

export default page;
