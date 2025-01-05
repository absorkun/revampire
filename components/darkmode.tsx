"use client"

import { useEffect, useState } from "react"
import { Switch } from "./ui/switch"

export default function DarkMode() {
    const [dark, setDark] = useState(false)
    useEffect(() => {
        const body = document.body
        if (dark) {
            body.classList.add("dark")
        } else {
            body.classList.remove("dark")
        }
    }, [dark])
    return (
        <div className="flex items-center space-x-2">
            <p className="lg:block">Light</p>
            <Switch onClick={() => setDark(!dark)} />
            <p className="lg:block">Dark</p>
        </div>
    )
}