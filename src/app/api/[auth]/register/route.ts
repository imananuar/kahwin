import { NextRequest, NextResponse } from "next/server";
import { taggedLogger } from "@/lib/logger";
import { registerUser } from "@/lib/services/userServices";
import { User } from "@prisma/client";
import { LogMessage } from "@/lib/interfaces/log";
import { RegisterRequest  } from "@/lib/interfaces/auth";
import { ErrorResponse, SuccessResponse } from "@/lib/interfaces/api";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const req: RegisterRequest = await request.json();
    const registerLogger = taggedLogger("register");
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

    const newUser: User | null = await registerUser(req);

    if (newUser) {        
        try {
            const logMessage: LogMessage = {
                ip: ip,
                userId: newUser.userId,
                event: 'register',
                message: 'Succesful'
            }
            registerLogger.info(logMessage);
    
            const response: SuccessResponse = {
                status: 200,
                message: "Success!"
            }
            return NextResponse.json(response)
    
        } catch (error) {
            const errorLog: LogMessage = {
                ip: ip,
                email: req.email,
                event: 'register',
                message: 'Failed to create user'
            }
            registerLogger.error(errorLog);
            
            const errorResponse: ErrorResponse = {
                status: 500,
                error: "Got error but dont know. Maybe networking i really dk lol"
            }
            return NextResponse.json(errorResponse);
        }
    }

    const errorResponse: ErrorResponse = {
        status: 409,
        error: "User already exists"
    }

    const errorLog: LogMessage = {
        ip: ip,
        email: req.email,
        event: 'register',
        message: 'User already exists'
    }
    registerLogger.error(errorLog);

    return NextResponse.json(errorResponse, { status: errorResponse.status });

}