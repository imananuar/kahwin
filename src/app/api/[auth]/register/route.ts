import { NextRequest, NextResponse } from "next/server";
import logger, { taggedLogger } from "@/lib/logger";
import { registerUser } from "@/lib/services/userServices";

interface RegisterRequest {
    firstName: string,
    lastName: string,
    birthPlace: string,
    email: string,
    password?: string,
    
}

interface RegisterResponse {
    status: number,
    message: string,
    error?: string,
}

interface LogMessage {
    event: string,
    ip: string,
    message: string,
    email?: string,
    userId?: string
}

export async function POST(request: NextRequest) {
    const req: RegisterRequest = await request.json();
    if (req.password !== undefined) {
        registerUser(req)
    }

    const response: RegisterResponse = {
        status: 200,
        message: "Success!"
    }
    return NextResponse.json(response)
}