import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from '@/lib/prisma'
import { LoginRequest } from "@/lib/interfaces/auth";
import { User } from "@prisma/client";
import { findUserByEmail } from "@/lib/services/userServices";
import { compareHash } from "@/lib/security";

export async function POST(request: NextRequest) {
    const loginReq: LoginRequest = await request.json();
    const user: User | null = await findUserByEmail(loginReq.email);
    console.log(loginReq);

    // todo: Login Page only prompt email first, then decide is the password exist or not
    // if password not exist, then ask them to create password, confirm password, then put secret token
    // In register, when register a new partner, generate them 6 letters token



    // if (body.email === "imananuar5367@gmail.com" && body.password === "testing") {
    //     const token = jwt.sign({ email: body.email }, process.env.JWT_SECRET as string, {
    //         expiresIn: '1h',    
    //     })
    //     return NextResponse.json({ token })
    // }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}