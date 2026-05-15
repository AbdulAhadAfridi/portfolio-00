import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ hasAdmin: count > 0 });
  } catch {
    // If DB fails, assume admin exists (safe default - blocks signup)
    return NextResponse.json({ hasAdmin: true });
  }
}

// Block signup attempts if admin already exists
export async function POST() {
  try {
    const count = await prisma.user.count();
    if (count > 0) {
      return NextResponse.json(
        { error: "Admin account already exists. Registration is disabled." },
        { status: 403 }
      );
    }
    return NextResponse.json({ allowed: true });
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
