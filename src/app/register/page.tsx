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

interface User {
    firstName: string;
    lastName: string;
    birthPlace: string;
    email: string;
    password: string;
}

export default function Register() {
    const [isFilledIn, setIsFilledIn] = useState<Boolean>(false);
    const [userData, setUserData] = useState<User>();
    const [partnerData, setPartnerData] = useState<User>();

    const handleRegisterUser = async (userData: any) => {
        // setIsFilledIn(true);
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
                throw new Error("Failed to register");
            }

            const result = await response.json();
            console.log("API Response:", result);

        } catch (error) {
            console.error("Error during API Call...", error)
        }

        // Send thank you email
    };

    const handleRegisterPartner = (partnerData: any) => {
        setPartnerData(partnerData);

        // Create temporary account
        // Send confirm your password
    }
      return (
        <div className="flex justify-center items-center min-h-screen">
            {isFilledIn ? (
                    <Card className="w-1/3">
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
                <Card className="w-1/3">
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