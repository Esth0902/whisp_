import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
    title: "Whisp",
    description: "...",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="fr">
            <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1, padding: "2rem", maxWidth: 960, margin: "auto", width: "100%" }}>
                {children}
            </main>
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
