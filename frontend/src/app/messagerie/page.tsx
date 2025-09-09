'use client';

import { useState } from 'react';

export default function Messagerie() {
    const [message, changerMessage] = useState('');
    const [listeMessage, changerListe] = useState<string[]>([]);

    const envoyerMessage = () => {
        if (message.trim() !== '') {
            changerListe([...listeMessage, message]);
            changerMessage('');
        }
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h1>💬 Messagerie</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => changerMessage(e.target.value)}
                placeholder="Écris ton message"
                style={{ padding: '0.5rem', width: '300px' }}
            />
            <button onClick={envoyerMessage} style={{ marginLeft: '1rem', padding: '0.5rem' }}>
                Envoyer
            </button>

            <ul style={{ marginTop: '2rem' }}>
                {listeMessage.map((msg, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {msg}
                    </li>
                ))}
            </ul>
        </div>
    );
}
