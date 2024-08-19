import { NextResponse } from "next/server";

// Mock database
let users = [];

export async function POST(request) {
  const { email, password } = await request.json();

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Add new user
  users.push({ email, password });

  return NextResponse.json({ message: "User registered successfully" });
}
