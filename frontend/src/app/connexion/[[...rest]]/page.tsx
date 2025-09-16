"use client";

import { SignIn } from '@clerk/nextjs';

export default function ConnexionPage() {
    return (
        <div
            style={{
                maxWidth: 400,
                margin: "auto",
                padding: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: 8,
                backgroundColor: "#fff",
            }}
        >
            <h1 style={{ textAlign: "center", marginBottom: 20 }}>Connexion</h1>
            <SignIn
                path="/connexion"       // Doit correspondre au chemin de cette page
                routing="path"          // <-- important pour éviter erreur routing Next.js
                afterSignInUrl="/"      // URL redirection après connexion réussie
            />
        </div>
    );
}
