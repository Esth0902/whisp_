
'use client';

import Link from 'next/link';

export default function Accueil() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>🏠 Accueil</h1>
            <br/>
            <Link href="/profil">Mon Profil</Link>
            <br/>
            <Link href="/messagerie">Ma Messagerie</Link>
            <br/>
            <Link href="/utilisateur">Utilisateurs</Link>

        </div>
    );
}
