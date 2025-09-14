import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { verifyToken } from '@clerk/clerk-sdk-node'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const authHeader = req.headers['authorization']

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or malformed Authorization header')
        }

        const token = authHeader.split(' ')[1]

        try {
            const payload = await verifyToken(token, {
                secretKey: process.env.CLERK_SECRET_KEY!,
                issuer: process.env.CLERK_ISSUER!,
            })
            req.user = payload // Attache la payload JWT à la requête pour un usage ultérieur
            return true
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token')
        }
    }
}
