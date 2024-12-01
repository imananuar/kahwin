import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return NextResponse.json({ error: 'Token missing or invalid' }, {
            status: 401
        })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return NextResponse.json({ message: "Protected Data", user: decoded})
    } catch (error) {
        return NextResponse.json({ error: "Token invalid or expired"}, { status: 401})
    }

}