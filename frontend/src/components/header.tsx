"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import LogoutButton from "@/components/logout";
import Link from "next/link";


export default function Header() {
    const { isSignedIn } = useUser();

    return (
        <header className="bg-gray-900 text-gray-100 px-8 py-4 flex items-center justify-between shadow-md">
            <h1 className="m-0 text-2xl font-bold font-sans select-none">
                <Link href="/" className="hover:text-gray-400 transition-colors">
                    Whisp
                </Link>
            </h1>
            {isSignedIn && (
                <nav className="flex items-center gap-8">
                    <Link href="/utilisateur" className="font-medium text-gray-100 hover:text-gray-400 transition-colors">
                        Utilisateurs
                    </Link>
                    <Link href="/messagerie" className="font-medium text-gray-100 hover:text-gray-400 transition-colors">
                        Messages
                    </Link>
                    <Link href="/profil" className="font-medium text-gray-100 hover:text-gray-400 transition-colors">
                        Profil
                    </Link>
                    <LogoutButton />
                </nav>
            )}
        </header>
    );
}