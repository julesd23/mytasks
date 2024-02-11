import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prisma from '@/utils/connect';

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({ error: 'Missing required fields', status: 400 });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: 'Title must be at least 3 characters long',
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date: date.length > 0 ? date : undefined,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (err) {
    console.error('ERROR CREATING TASK: ', err);
    return NextResponse.json({ error: 'Error creating task', status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('ERROR GETTING TASKS: ', error);
    return NextResponse.json({ error: 'Error updating task', status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { id, isCompleted, isImportant, date, description, title } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
        isImportant,
        date,
        description,
        title,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('ERROR UPDATING TASK: ', error);
    return NextResponse.json({ error: 'Error deleting task', status: 500 });
  }
}
