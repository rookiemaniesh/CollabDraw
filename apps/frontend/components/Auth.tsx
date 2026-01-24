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
            if (type === "signin") {
                localStorage.setItem("token", res.data.token);
                router.push("/dashboard");

            } else {
                router.push("/signin")
            }
        } catch (error) {
            console.log(error);
            alert('Error:' + error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#1E1E1E] p-10 shadow-xl border border-gray-800 relative z-10">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-white">
                        {type === "signin" ? "Sign in" : "Sign up"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
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
                                    className="relative block w-full rounded-lg border border-gray-700 bg-[#2D2D2D] px-4 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
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
                                className="relative block w-full rounded-lg border border-gray-700 bg-[#2D2D2D] px-4 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
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
                                className="relative block w-full rounded-lg border border-gray-700 bg-[#2D2D2D] px-4 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all duration-200"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3 text-sm font-medium text-white hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#1E1E1E] transition-all duration-200"
                        >
                            {type === "signin" ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm">
                    <p className="text-gray-400">
                        {type === "signin"
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <Link
                            href={type === "signin" ? "/signup" : "/signin"}
                            className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-all duration-200"
                        >
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
