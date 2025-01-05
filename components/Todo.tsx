"use client"

import { apiUrl, Todo } from "@/lib/models"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function TodoComponent() {
    const [data, setData] = useState<Todo[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [newData, setNewData] = useState({ title: "", done: false })


    const fetchData = async () => {
        setLoading(true)
        await fetch(apiUrl)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addData = async () => {
        setLoading(true)
        await fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(() => setNewData({ title: "", done: false }))
            .catch(e => setError(e.message))
            .finally(() => {
                setLoading(false)
                fetchData()

            })
    }

    const updateData = async (id: string, newDone: boolean) => {
        setLoading(true)
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ done: newDone })
        })
            .catch(e => setError(e))
            .finally(() => {
                setLoading(false)
                fetchData()
            })
    }

    const deleteData = async (id: string) => {
        setLoading(true)
        await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch(e => setError(e))
            .finally(() => {
                setLoading(false)
                fetchData()

            })
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        addData()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

    if (loading) {
        return <p className="flex justify-center items-center mx-auto w-full min-h-screen">LOADING...........</p>
    }

    return (
        <div className="mx-auto">
            <form onSubmit={handleSubmit} className="lg:w-1/2 mx-auto space-y-2">
                {error && <div className="text-red-400">{error}</div>}
                <Label htmlFor="title">Title</Label>
                <Input
                    className="border-primary"
                    type="text" name="title" id="title"
                    value={newData.title}
                    onChange={handleChange}
                    required max={150} />
                <Button type="submit">Insert</Button>
            </form>
            <Table className={`${data.length == 0 ? "hidden" : ""} mt-5 mx-auto lg:w-1/2`}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(item => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                <Button
                                    className={`${item.done ? "bg-green-400 hover:bg-secondary" : "bg-secondary hover:bg-green-400"} rounded-full border-2`}
                                    onClick={() => updateData(item.id, !item.done)}
                                />
                            </TableCell>
                            <TableCell className={item.done ? "line-through" : ""}>{item.title}</TableCell>
                            <TableCell className="text-center">
                                <Button variant="destructive" onClick={() => {
                                    const confirm = window.confirm("Yakin ingin menghapus?")
                                    if (confirm) {
                                        deleteData(item.id)
                                    } else {
                                        return
                                    }
                                }}>X</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    )
}