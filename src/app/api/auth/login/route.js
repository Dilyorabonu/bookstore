import { NextResponse } from "next/server";

// Mock database
let users = [];
let tokens = {}; // Store tokens for users (in-memory example)

export async function POST(request) {
  const { email, password } = await request.json();

  // Find user
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const token = "mock-jwt-token"; // Replace with actual token generation logic
    const refreshToken = "mock-refresh-token"; // Replace with actual refresh token generation logic

    // Store tokens for user
    tokens[email] = { token, refreshToken };

    return NextResponse.json({ token, refreshToken });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
