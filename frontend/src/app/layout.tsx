// layout.tsx
import type { Metadata } from "next";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Whisp",
    description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="fr">
            <body className="flex flex-col min-h-screen">
            <Header />
            {/* Corps principal avec sidebar */}
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
            <Footer />
            </body>
            </html>
        </ClerkProvider>
    );
}
