"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Added username
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
        username, // Include username in the request
      });
      if (response.status === 200) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error(response.data.error || "Registration failed.");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleRegister}
        className="space-y-6 bg-base shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full"
        />
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
