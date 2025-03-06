import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (session && session.user.role === "admin") return NextResponse.json(session.user);
  return NextResponse.json(
    { message: "You are not supposed to be here. Get out!" },
    { status: 403 }
  );
}
