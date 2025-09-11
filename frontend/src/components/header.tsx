import React from "react";

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>Whisp</h1>
            <nav style={navStyle}>
                <a href="/" style={linkStyle}>Accueil</a>
                <a href="/utilisateur" style={linkStyle}>Utilisateurs</a>
                <a href="/messagerie" style={linkStyle}>Messages</a>
                <a href="/profil" style={linkStyle}>Profil</a>
            </nav>
        </header>
    );
}

const headerStyle: React.CSSProperties = {
    backgroundColor: "#0a63b7",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const navStyle: React.CSSProperties = {
    display: "flex",
    gap: "1.5rem",
};

const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
    transition: "color 0.2s",
};