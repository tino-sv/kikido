// src/app/api/todos/route.js
import { prisma } from "@/server/db";
import { NextResponse } from "next/server";

// GET all todos
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

// POST new todo
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, category, date, importanceLevel } = body;
    
    const todo = await prisma.todo.create({
      data: {
        text,
        category,
        date: new Date(date),
        importanceLevel,
      },
    });
    
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 },
    );
  }
}

// PUT update todo
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, completed } = body;
    
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
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

// DELETE todo
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    
    await prisma.todo.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error((error as Error).stack);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
