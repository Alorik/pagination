import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    }),

    prisma.post.count(),
  ]);

  return NextResponse.json({
    data: posts,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  });
}
