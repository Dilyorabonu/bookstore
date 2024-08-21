"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  GearIcon,
  ExitIcon,
  BellIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ThemeToggler } from "./ThemeToggler";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/lib/zustand"; // Import Zustand store

export default function Header() {
  const cartItems = useCartStore((state) => state.cartItems) || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Debug: Log cartItems and totalQuantity
  console.log("Cart Items:", cartItems);
  console.log("Total Quantity:", totalQuantity);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (token && userEmail && userName) {
      setUser({ email: userEmail, name: userName });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      setUser(null);
      router.push("/login");
      toast.success("Logout successful.");
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Search query cannot be empty!");
      return;
    }

    try {
      const response = await axios.get(`/api/search?query=${query}`);

      if (response.data.length === 0) {
        toast.error("We didn't find your book.");
      } else {
        toast.success(`Found ${response.data.length} books!`);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <header className="shadow-sm py-5">
      <div className="container flex items-center justify-between px-5">
        <span className="block font-medium text-xl">Book Store</span>
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <button type="submit" className="p-2">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </button>
        </form>
        <div className="flex items-center space-x-4">
          {/* Theme Toggler */}
          <ThemeToggler />

          {/* Cart with Icon and Badge */}
          <div className="relative">
            <Button
              onClick={() => router.push("/cart")} // Redirect to cart page
              variant="outline"
              size="icon"
            >
              <BellIcon className="w-4 h-4" />
              {/* <ShoppingCartIcon className="w-6 h-6" /> */}
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Button>
          </div>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {user ? `Welcome, ${user.name}` : "Settings"}
                <GearIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout <ExitIcon className="mr-2" />
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
