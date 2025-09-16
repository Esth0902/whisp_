"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type Utilisateur = {
    id: number;
    nom: string;
    email: string;
};

export default function ProfilPage() {
    const { user, isLoaded, isSignedIn } = useUser();

    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            fetch(`http://localhost:4000/utilisateur/clerk/${user.id}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Erreur lors du chargement utilisateur.");
                    return res.json();
                })
                .then((data) => {
                    setUtilisateur(data);
                    setUsername(data.nom);
                })
                .catch((err) => setMessage(err.message));
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isSignedIn) {
        return <div className="p-6 text-center">Veuillez vous connecter pour voir votre profil.</div>;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:4000/utilisateur/${user!.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom: username }),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status} lors de la mise à jour`);
            }

            if (password) {
                await user!.updatePassword({ password });
            }

            setPassword("");
            setMessage("Profil mis à jour avec succès !");
        } catch (error: any) {
            setMessage(`Erreur lors de la mise à jour : ${error.message || error.toString()}`);
        } finally {
            setLoading(false);
        }
    }

    return (

        <main className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
            <h1 className="text-2xl font-bold mb-6">Mon profil</h1>

            {message && (
                <p className={`mb-4 text-center ${message.startsWith("Erreur") ? "text-red-600" : "text-green-600"}`}>
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={utilisateur?.email ?? ""}
                        disabled
                        className="w-full bg-gray-100 cursor-not-allowed rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="username" className="block font-medium mb-1">Pseudo</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        placeholder="Votre pseudo"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium mb-1">Nouveau mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Laisser vide pour ne pas changer"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded text-white transition ${
                        loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                >
                    {loading ? "Chargement..." : "Sauvegarder les modifications"}
                </button>
            </form>
        </main>
    );
}
