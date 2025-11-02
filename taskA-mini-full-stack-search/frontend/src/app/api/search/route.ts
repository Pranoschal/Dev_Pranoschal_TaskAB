import { type NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  const { query } = await request.json();
  // Use environment variable
  const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL || 'http://localhost:5000';
  
  const response = await fetch(`${EXPRESS_URL}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}
