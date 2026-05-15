import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Submit a new review (public)
export async function POST(request: Request) {
  try {
    const { name, role, content, rating } = await request.json();

    if (!name || !role || !content) {
      return NextResponse.json(
        { error: "Name, role, and review content are required" },
        { status: 400 }
      );
    }

    await prisma.review.create({
      data: {
        name,
        role,
        content,
        rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Review submitted! It will appear after admin approval.",
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}

// GET - Fetch approved reviews (public)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
