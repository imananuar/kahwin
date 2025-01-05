'use client'

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import  RegisterPartnerFields from "../components/fields/RegisterPartnerFields";
import RegisterFields from "../components/fields/RegisterFields";
import CommonForm from "../components/forms/CommonForm";
import { encryptText } from "@/lib/security";
import { User } from "@prisma/client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [isFilledIn, setIsFilledIn] = useState<Boolean>(false);
    const [userData, setUserData] = useState<User>();
    const { toast } = useToast();
    const router = useRouter();

    const handleRegisterUser = async (userData: any) => {
        const encryptedPassword = encryptText(userData.password);
        userData.password = encryptedPassword;
        setUserData(userData);
    
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                toast({
                    description: await response.json().then(result => result.error),
                    action: (
                        <Link href="/login">
                            <ToastAction altText="Proceed to Login">Login</ToastAction>
                        </Link>
                      ),
                })
            } else {
                setIsFilledIn(true);
            }

        } catch (error) {
            console.error("Error during API Call...", error)
        }

        // Send thank you email
    };

    const handleRegisterPartner = async (partnerData: any) => {

        const partner = {
            firstName: partnerData.partnerFirstName,
            lastName: partnerData.partnerLastName,
            birthPlace: partnerData.partnerBirthPlace,
            email: partnerData.partnerEmail,
            partner: userData?.email
        }

        // Create temporary account
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(partner)
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            toast({
                title: "Partner account created!",
                description: "Your partner now can login to the system!",
            })

            router.push("/");

        } catch (error) {
            console.error("Error during API Call...", error)
        }
        // Send confirm your password
    }
      return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-wedding-primary to-white">
            {isFilledIn ? (
                    <Card className="w-1/3 my-8">
                    <CardHeader>
                        <CardTitle>Create account for your partner</CardTitle>
                        <CardDescription>We will send to his / her email for password creation</CardDescription>
                    </CardHeader>
                    <CardContent>
                            <CommonForm
                            fields={RegisterPartnerFields}
                            onSubmit={handleRegisterPartner}
                            buttonName="Send Email"
                            reset={true}
                            />
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-1/3 my-8">
                    <CardHeader>
                        <CardTitle>Let's start your journey</CardTitle>
                        <CardDescription>First let's register your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                            <CommonForm
                            fields={RegisterFields}
                            onSubmit={handleRegisterUser}
                            buttonName="Register"
                            reset={false}
                            />
                    </CardContent>
                </Card>
            )}
        </div>
      );
}