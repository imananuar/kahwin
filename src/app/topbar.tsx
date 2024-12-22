"use client";

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
import { motion } from "framer-motion"

interface LoginRequest {
  email: string;
  password: string;
}

const Topbar = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-end justify-between pt-8 pb-8 px-8">
        <div className="my-auto">
          <p>Memoria</p>
        </div>
        <div className="my-auto">
          {/* Build search button like AirBnb */}
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-8">
                Login
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
          <Button variant="secondary" className="ml-4 px-8">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </ motion.div>
  );
};

export default Topbar;
