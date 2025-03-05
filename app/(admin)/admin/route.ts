import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(req) {
  if (req.auth && req.auth.user.role === "admin") return NextResponse.json(req.auth);
  return NextResponse.json(
    { message: "You are not supposed to be here. Get out!" },
    { status: 403 }
  );
});
