import { NextResponse } from "next/server";

// Mock database
let users = [];

export async function POST(request) {
  const { email, password } = await request.json();

  // Find user
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const token = "mock-jwt-token"; // Replace with actual token generation logic
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
