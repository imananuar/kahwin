import { prisma } from "@/lib/prisma";
import { compareHash, hashText } from "@/lib/security";
import { RegisterRequest } from "../interfaces/auth";
import { User } from "@prisma/client";

export async function registerUser(user: RegisterRequest): Promise<User> {
    if (user.password) {
        const hashPassword: string = await hashText(user.password);
        user.password = hashPassword;
    }
    try {
        const newUser: User = await prisma.user.create({
            data: {
                "birthPlace": user.birthPlace,
                "email": user.email,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName
            }
        })
        return newUser;
    } catch (error) {
        throw new Error("Some error occured, ");
    }
}