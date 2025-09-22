// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/connexion", "/inscription", "/api"];

function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

export default function middleware(req: any, ev: any) {
    if (isPublicPath(req.nextUrl.pathname)) {
        return NextResponse.next();
    }

    // Appelle le middleware Clerk pour les autres routes
    return clerkMiddleware(req, ev);
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|connexion|inscription).*)",
    ],
};
