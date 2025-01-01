import { NextRequest, NextResponse } from "next/server";
import logger, { taggedLogger } from "@/lib/logger";
import { registerUser } from "@/lib/services/userServices";
import { User } from "@prisma/client";
import { LogMessage } from "@/lib/interfaces/log";
import { RegisterRequest, RegisterResponse } from "@/lib/interfaces/auth";

export async function POST(request: NextRequest) {
    const req: RegisterRequest = await request.json();
    const registerLogger = taggedLogger("register");
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    console.log(ip);

    try {
        const newUser: User = await registerUser(req);
        const logMessage: LogMessage = {
            ip: ip,
            userId: newUser.id,
            event: 'register',
            message: 'Succesful'
        }
        registerLogger.info(logMessage);

        const response: RegisterResponse = {
            status: 200,
            message: "Success!"
        }
        return NextResponse.json(response)

    } catch (error) {

    }

}