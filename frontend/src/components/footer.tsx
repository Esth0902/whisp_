import React from "react";

export default function Footer() {
    return (
        <footer style={footerStyle}>
            <p>© {new Date().getFullYear()} Whisp - Tous droits réservés</p>
            <p style={{ fontSize: "0.8rem", marginTop: 4, color: "#ccc" }}>
                Site de messagerie simple et moderne
            </p>
        </footer>
    );
}

const footerStyle: React.CSSProperties = {
    backgroundColor: "#0a63b7",
    color: "white",
    padding: "1rem 2rem",
    textAlign: "center",
    marginTop: "auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};
