"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthProps {
    type: "signin" | "signup";
}


export const Auth = ({ type }: AuthProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSubmit() {
        const url = type === "signin" ? `${HTTP_BACKEND}/api/auth/signin` : `${HTTP_BACKEND}/api/auth/signup`;

        try {
            const res = await axios.post(url, {
                email,
                password,
                name: type === "signup" ? name : undefined
            });
            if(type==="signin"){
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");

            }else{
                router.push("/signin")
            }
        } catch (error) {
            console.log(error);
            alert('Error:' + error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {type === "signin" ? "Sign in" : "Sign up"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {type === "signin"
                            ? "Welcome back to CollabBoard"
                            : "Create your account to get started"}
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        {type === "signup" && (
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-all duration-200"
                                    placeholder="Full Name"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-all duration-200"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="relative block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-all duration-200"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button" // Changed to button to prevent form submission behavior for now
                            onClick={handleSubmit}
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
                        >
                            {type === "signin" ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        {type === "signin"
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <Link
                            href={type === "signin" ? "/signup" : "/signin"}
                            className="font-medium text-black hover:underline transition-all duration-200"
                        >
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
