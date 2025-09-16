"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
    const { isSignedIn, user } = useUser();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
            {!isSignedIn ? (
                <>
                    <h1 className="text-5xl font-extrabold mb-12 text-gray-900 select-none">
                        Bienvenue sur Whisp
                    </h1>
                    <div className="flex space-x-6">
                        <Link
                            href="/connexion"
                            className="px-8 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition"
                        >
                            Se connecter
                        </Link>
                        <Link
                            href="/inscription"
                            className="px-8 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
                        >
                            S'inscrire
                        </Link>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-3xl font-semibold mb-6 text-gray-900 select-none">
                        Bonjour, {user?.username ?? "Utilisateur"} !
                    </h1>
                    <p className="mb-8 max-w-md text-center text-gray-700">
                        Vous êtes connecté à Whisp, votre plateforme de messagerie simple et moderne.
                    </p>
                    <Link
                        href="/messagerie"
                        className="px-10 py-4 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition"
                    >
                        Accéder à la messagerie
                    </Link>
                </>
            )}
        </main>
    );
}

