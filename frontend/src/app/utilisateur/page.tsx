"use client";
import { useEffect, useState } from "react";

type Utilisateur = {
    id: number;
    nom: string;
    email: string;
};

export default function UtilisateurPage() {
    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/utilisateur")
            .then((res) => res.json())
            .then((data) => setUtilisateurs(data));
    }, []);

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {utilisateurs.map((u) => (
                    <li key={u.id}>
                        {u.nom} — {u.email}
                    </li>
                ))}
            </ul>

        </div>
    );
}
