import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma'

interface LoginRequest {
    email: string;
    password: string;
}



export async function POST(request: NextRequest) {
    const body: LoginRequest = await request.json();

    const user = await prisma.user.findFirst({
        where: {
            'email': body.email
        }
    })

    if (body.email === "imananuar5367@gmail.com" && body.password === "testing") {
        const token = jwt.sign({ email: body.email }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',    
        })
        return NextResponse.json({ token })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}