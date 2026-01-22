"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CurrentlyWorkingPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6">
            <div className="relative w-full max-w-2xl">
                

                {/* Main Content Card */}
                <div className="bg-neutral-900/95 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-neutral-800 shadow-2xl flex flex-col items-center gap-6">
                    {/* Work in Progress GIF */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <img 
                            src="https://gifdb.com/images/high/under-construction-road-sign-digging-9vs9um92kb7bomw7.webp" 
                            alt="Work in Progress"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Currently Working On It
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            This feature is under development
                        </p>
                        <p className="text-neutral-500 text-sm max-w-md mx-auto">
                            We're working hard to bring you this feature. Please check back soon!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            Go Home
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
