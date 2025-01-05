import { prisma } from "@/lib/prisma";

export async function GET() {
    const todos = await prisma.todo.findMany()
    if (!todos) {
        return Response.json("Error kenapa ya")
    }
    return Response.json(todos)
}

export async function POST(request: Request) {
    const res = await request.json()
    await prisma.todo.create({
        data: res
    })
    return Response.json("Created")
}