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
import { MagnifyingGlassIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Import toast from Sonner
import { ThemeToggler } from "./ThemeToggler";
import axios from "axios"; // Import Axios for API call
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

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
      await axios.post("/api/auth/logout"); // Ensure server-side logout handling
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      setUser(null);
      router.push("/login");
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
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/billing")}>
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/team")}>
                Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/subscription")}>
                Subscription
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout <ExitIcon className="mr-2" />
                </DropdownMenuItem>
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
