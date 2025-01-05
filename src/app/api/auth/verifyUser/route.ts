import { SuccessResponse } from "@/lib/interfaces/api";
import { LoginRequest } from "@/lib/interfaces/auth";
import { findUserByEmail } from "@/lib/services/userServices";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const loginReq: LoginRequest = await request.json();
    const user: User | null = await findUserByEmail(loginReq.email);
    console.log(loginReq);
    let type: string = "Existing";
    if (user) {
        if (!user.password) {
            type = "New";
        }
        return NextResponse.json({status: 200, message: "User exist in database.", type: type})
    }
    return NextResponse.json({error: "User not found!"}, {status: 404})
}