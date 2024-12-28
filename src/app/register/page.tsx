'use client'

import React, { useEffect, useRef, useState } from "react";
import RegisterFields from "../components/fields/registerFields";
import ReusableForm from "../components/forms/ReusableForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import RegisterPartnerFields from "../components/fields/RegisterPartnerFields";
import { useForm } from "react-hook-form";

interface User {
    firstName: String;
    lastName: String;
    birthPlace: String;
    email: String;
    password: String;
}


export default function Register() {
    const [isFilledIn, setIsFilledIn] = useState<Boolean>(false);
    const [userData, setUserData] = useState<User>();
    const [partnerData, setPartnerData] = useState<User>();

    const handleSubmit = (userData: any) => {
        console.log("Form submitted:", userData);
        // Call your login API here
        setIsFilledIn(true);
        setUserData(userData);
        return {};        
    };

    const handlePartnerSubmit = (partnerData: any) => {
        console.log("userData", userData);
        console.log("partnerData: ", partnerData);
        console.log(partnerData);
        setPartnerData(partnerData);
    }
    const form = useForm({ mode: "onChange", shouldFocusError: true });
    const partnerForm = useForm({ mode: "onChange", shouldFocusError: true });
      return (
        <div className="flex justify-center items-center min-h-screen">
            {isFilledIn ? (
                    <Card className="w-1/3">
                    <CardHeader>
                        <CardTitle>Create account for your partner</CardTitle>
                        <CardDescription>We will send to his / her email for password creation</CardDescription>
                    </CardHeader>
                    <CardContent>
                            <ReusableForm
                            fields={RegisterPartnerFields}
                            onSubmit={handlePartnerSubmit}
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
                            <ReusableForm
                            fields={RegisterFields}
                            onSubmit={handleSubmit}
                            buttonName="Register"
                            reset={false}
                            />
                    </CardContent>
                </Card>
            )}
        </div>
      );
}