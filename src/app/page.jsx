"use client";
import Header from "@/components/Header";
import { axiosClient } from "@/utils/axiosClient";
import { useEffect } from "react";

function page() {
  useEffect(() => {
    axiosClient("/products")
      .then((data) => console.log(data.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Header />
      <main></main>
    </>
  );
}

export default page;
