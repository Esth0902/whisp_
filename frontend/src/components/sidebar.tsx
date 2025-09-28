"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={`${
                    open ? "w-64" : "w-16"
                } bg-gray-300 text-gray-800 h-screen transition-all duration-300 flex flex-col`}
            >
                {/* Toggle button */}
                <button
                    className="p-3 hover:bg-gray-800 transition flex justify-center"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Menu */}
                <nav className="flex flex-col gap-4 mt-6 px-2">
                    <Link
                        href="/messagerie"
                        className="flex items-center gap-2 hover:text-gray-400 transition"
                    >
                        💬 {open && "Messagerie"}
                    </Link>
                    <Link
                        href="/utilisateur"
                        className="flex items-center gap-2 hover:text-gray-400 transition"
                    >
                        👥 {open && "Utilisateurs"}
                    </Link>
                </nav>
            </aside>
        </div>
    );
}
