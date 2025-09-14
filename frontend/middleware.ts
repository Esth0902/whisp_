import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/connexion', '/inscription', '/api'];

function isPublicPath(pathname: string) {
    return PUBLIC_PATHS.some(path => pathname.startsWith(path));
}

export function middleware(req: NextRequest, event: any) {
    if (isPublicPath(req.nextUrl.pathname)) {
        return NextResponse.next();
    }
    return clerkMiddleware(req, event);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|connexion|inscription).*)',
    ],
};
