"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import LogoutButton from "@/components/logout";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
    const { isSignedIn } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 text-gray-100 px-6 py-4 flex items-center justify-between shadow-md">
            {/* Logo */}
            <h1 className="text-2xl font-bold font-sans select-none">
                <Link href="/" className="hover:text-gray-400 transition-colors">
                    Whisp
                </Link>
            </h1>

            {/* Desktop navigation */}
            {isSignedIn && (
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/utilisateur"
                        className="font-medium hover:text-gray-400 transition-colors"
                    >
                        Utilisateurs
                    </Link>
                    <Link
                        href="/messagerie"
                        className="font-medium hover:text-gray-400 transition-colors"
                    >
                        Messages
                    </Link>
                    <Link
                        href="/profil"
                        className="font-medium hover:text-gray-400 transition-colors"
                    >
                        Profil
                    </Link>
                    <LogoutButton />
                </nav>
            )}

            {/* Mobile button */}
            {isSignedIn && (
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-800 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            {/* Mobile menu */}
            {menuOpen && isSignedIn && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 shadow-md md:hidden z-50">
                    <nav className="flex flex-col items-center gap-4 py-6">
                        <Link
                            href="/utilisateur"
                            className="font-medium hover:text-gray-400 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            Utilisateurs
                        </Link>
                        <Link
                            href="/messagerie"
                            className="font-medium hover:text-gray-400 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            Messages
                        </Link>
                        <Link
                            href="/profil"
                            className="font-medium hover:text-gray-400 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            Profil
                        </Link>
                        <LogoutButton />
                    </nav>
                </div>
            )}
        </header>
    );
}
