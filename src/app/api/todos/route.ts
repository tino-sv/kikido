// src/app/api/todos/route.js
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { NextResponse } from "next/server";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(req: any) {
  try {
    const { text, category, importanceLevel, date } = await req.json();

    console.log(text, category, importanceLevel, date);

    // Validation (Importance Level)
    if (!["low", "medium", "high"].includes(importanceLevel)) {
      return NextResponse.json(
        {
          error: "Invalid importanceLevel. Must be low, medium, or high.",
        },
        { status: 400 },
      );
    }

    console.log(date)

    const todo = await prisma.todo.create({
      data: {
        text,
        category,
        importanceLevel,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 },
    );
  }
}

export async function PUT(req: any) {
  try {
    const { id, completed } = await req.json();
    const todo = await prisma.todo.update({
      where: { id: id },
      data: { completed: completed },
    });
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: any) {
  try {
    const { id } = await req.json();
    await prisma.todo.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
