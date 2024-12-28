'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoginRequest {
    email: string;
    password: string;
}
  
export default function LandingPage() {
    const form = useForm<LoginRequest>();
    const { register, handleSubmit } = useForm<LoginRequest>();
    
    async function callLoginAPI(payload: LoginRequest) {
    const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
        'Content-Type': "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    }
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-[24rem] h-20 mx-4 text-xl">
                                    Continue your preparation journey
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="m-auto">Login</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <div className="grid gap-4 py-4">
                                        <form onSubmit={handleSubmit(callLoginAPI)}>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="grid grid-cols-4 items-center gap-4 mb-2">
                                                                <Label htmlFor="email" className="text-right">
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    placeholder="Email"
                                                                    {...field}
                                                                    type="text"
                                                                    id="username"
                                                                    className="col-span-3"
                                                                    {...register("email", {
                                                                        required: "Email is required!",
                                                                    })}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="grid grid-cols-4 items-center gap-4 mb-2">
                                                                <Label htmlFor="password" className="text-right">
                                                                    Password
                                                                </Label>
                                                                <Input
                                                                    type="password"
                                                                    placeholder="password"
                                                                    className="col-span-3"
                                                                    {...field}
                                                                    {...register("password", {
                                                                        required: "Password is required!",
                                                                    })}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="">
                                                <DialogDescription className="ml-4">
                                                    Not register yet?{" "}
                                                    <Link href="/register" className="underline">
                                                        Register now
                                                    </Link>
                                                </DialogDescription>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Login</Button>
                                            </DialogFooter>
                                        </form>
                                    </div>
                                </Form>
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
