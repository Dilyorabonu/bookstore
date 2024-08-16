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

import { MagnifyingGlassIcon, GearIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { toast } from "sonner"; // Import toast from Sonner

import { ThemeToggler } from "./ThemeToggler";

import axios from "axios"; // Import Axios for API call

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

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
            <DropdownMenuTrigger>
              <Button variant="outline">
                Settings
                <GearIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
