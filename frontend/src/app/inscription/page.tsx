"use client";

import { useState } from "react";

export default function InscriptionPage() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setErreur("");

        try {
            const res = await fetch("http://localhost:4000/utilisateur", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nom, email, motDePasse }),
            });

            if (res.ok) {
                setMessage("Inscription réussie !");
                setNom("");
                setEmail("");
                setMotDePasse("");
            } else {
                const err = await res.json();
                setErreur(err.message || "Erreur lors de l'inscription");
            }
        } catch (error) {
            setErreur("Erreur réseau ou serveur");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <h1>Inscription</h1>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {erreur && <p style={{ color: "red" }}>{erreur}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Nom :
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        maxLength={50}
                    />
                </label>
                <br />
                <label>
                    Email :
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        maxLength={100}
                    />
                </label>
                <br />
                <label>
                    Mot de passe :
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        minLength={6}
                        maxLength={100}
                    />
                </label>
                <br />
                <button type="submit" style={{ marginTop: 10 }}>
                    S’inscrire
                </button>
            </form>
        </div>
    );
}
