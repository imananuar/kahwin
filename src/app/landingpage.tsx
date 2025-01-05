'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CommonForm from "./components/forms/CommonForm";
import { ExistingUserLoginFields, LoginFields, NewUserLoginFiels } from "./components/fields/LoginFields";
import { useToast } from "@/components/hooks/use-toast";
import { encryptText } from "@/lib/security";
import { User } from "@prisma/client";

export default function LandingPage() {

    const { toast } = useToast();
    const [loginFields, setLoginFields] = useState(LoginFields);
    const [loginAPI, setLoginAPI] = useState("/api/auth/verifyUser");

    async function handleLogin(loginReq: any) {
        // loginReq.password = encryptText(loginReq.password);
        const response = await fetch(loginAPI, {
            method: 'POST',
            headers: {
            'Content-Type': "application/json",
            },
            body: JSON.stringify(loginReq),
        });

        if (!response.ok) {
            console.log("Response is: ", response.status)
            if (response.status === 404) {
                console.log("is the response ok meow??")
                toast({
                    description: response.json().then(result => result.error)
                })
            }
        } else {
            const data = await response.json();
            if (data.type === "Existing") {
                setLoginFields(ExistingUserLoginFields);
                setLoginAPI("/api/auth/login");

            } else {
                setLoginFields(NewUserLoginFiels);
                setLoginAPI("/api/auth/createPassword");
            }
        }
        
    }

    const footer: React.ReactNode = <>  Not registered yet?{" "}
                                    <Link href="/register" className="underline">
                                        Register now
                                    </Link>
                                </>
    
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Image
                src="/assets/bg-img.jpg" // Replace with your image path
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="-z-10" // Ensures it's behind other content
            />
            <div className="mx-auto">
                <div className="mx-auto text-center text-4xl text-white">
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, staggerChildren: 0.05 }}
                    >
                        <AnimatedText text="Wedding preparations feeling overwhelming?" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.8 }}
                    >
                        {/* <AnimatedText text="Don't worry, we got you covered!" /> */}
                        <p>Don't worry, we've got you covered!</p>
                    </motion.div>
                </div>
                <div className="flex justify-center">
                    <div className="mx-auto my-12">

                        {/* Register */}
                        <Link href="/register">
                            <Button variant="secondary" className="w-[24rem] h-20 mx-4 text-xl bg-c_cream">
                                Start my wedding journey
                            </Button>
                        </Link>

                        {/* Login */}
                        <Dialog onOpenChange={() => {
                            setLoginFields(LoginFields), 
                            setLoginAPI("/api/auth/verifyUser")}}
                        >
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-[24rem] h-20 mx-4 text-xl">
                                    Continue your preparation journey
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="m-auto">Login</DialogTitle>
                                </DialogHeader>
                                <CommonForm 
                                    fields={loginFields}
                                    onSubmit={handleLogin}
                                    footerContent={footer}
                                    buttonName="Login"
                                    reset={false}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0
    }
}


type AnimatedTextProps = {
    text: string,
    el?: keyof JSX.IntrinsicElements,
    className?: string
}

const AnimatedText = ({
    text,
    el: Wrapper = "p",
    className,
}: AnimatedTextProps) => {
    return (
        <Wrapper className = {className}>
            <span className="sr-only">{text}</span>
            <motion.span initial="hidden" animate="visible" transition={{staggerChildren: 0.05}} aria-hidden>
                {text.split('').map((char, i) => (
                    <motion.span
                        variants={defaultAnimations}
                        key={i}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    )
}
