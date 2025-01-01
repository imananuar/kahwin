import { prisma } from "@/lib/prisma";
import { compareHash, generateRandomID, hashText } from "@/lib/security";
import { RegisterRequest } from "../interfaces/auth";
import { User } from "@prisma/client";

export async function registerUser(user: RegisterRequest): Promise<User | null> {
    
    const existingUser = await findUserByEmail(user.email);

    if (!existingUser) {
        if (user.password) {
            const hashPassword: string = await hashText(user.password.trim());
            user.password = hashPassword;
        }

        if (user.partner) {
            await prisma.user.update({
                where: {
                    email: user.partner
                },
                data: {
                    partner: user.email
                }
            })

        }

        try {
            return await prisma.user.create({
                data: {
                    "userId": generateRandomID(6),
                    "birthPlace": user.birthPlace.trim(),
                    "email": user.email.trim(),
                    "password": user.password ?? null,
                    "firstName": user.firstName.trim(),
                    "lastName": user.lastName.trim(),
                    "partner": user.partner ?? null
                }
            })
        } catch (error) {
            throw new Error("Some error occured, ");
        }

    }

    return null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            "email": email
        }
    })
}

// export async function findUserByUserId(userId: string): Promise<User | null> {
//     return await prisma.user.findUnique({
//         where: {
//             "userId": userId
//         }
//     })
// }