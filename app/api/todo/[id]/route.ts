import { prisma } from "@/lib/prisma"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const todo = await prisma.todo.findFirst({
        where: {
            id: id
        }
    })
    return Response.json(todo)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const res = await request.json()
    await prisma.todo.update({
        where: {
            id: id
        },
        data: res
    })
    return Response.json("Updated")
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    await prisma.todo.delete({
        where: {
            id: id
        }
    })
    return Response.json("Deleted")
}
