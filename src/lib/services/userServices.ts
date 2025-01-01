import { prisma } from "@/lib/prisma";
import { compareHash, hashText } from "@/lib/security";

interface RegisterRequest {
    firstName: string,
    lastName: string,
    birthPlace: string,
    email: string,
    password?: string,
    
}

export async function registerUser(user: RegisterRequest) {
    if (user.password) {
        const hashPassword = await hashText(user.password);
        user.password = hashPassword;
    }
    await prisma.user.create({
        data: {
            "birthPlace": user.birthPlace,
            "email": user.email,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName
        }
    })
}