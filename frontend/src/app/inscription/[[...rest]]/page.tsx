"use client";

import { SignUp } from '@clerk/nextjs';

export default function InscriptionPage() {
    return (
        <div style={{
            maxWidth: 400,
            margin: "auto",
            padding: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: 8,
            backgroundColor: "#fff"
        }}>
            <SignUp
                afterSignUpUrl="/profil"   // redirection après inscription
                path="/inscription"  // doit matcher la route
            />
        </div>
    );
}
