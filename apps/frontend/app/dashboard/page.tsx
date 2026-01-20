"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");

    const handleCreateCanvas = async (): Promise<void> => {
        const slug = Math.random().toString(36).substring(2, 9);
        const token = localStorage.getItem('token');
        const res = await axios.post(`${HTTP_BACKEND}/api/room`, {
            roomId: slug
        }, {
            headers: {
                Authorization: token
            }
        })
        const roomId=res.data.room.id;
        // console.log(res)
        router.push(`/canvas/${roomId}`);
    };

    const handleJoinCanvas = (e: React.FormEvent) => {
        e.preventDefault();
        if (roomId.trim()) {
            router.push(`/canvas/${roomId}`);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                        Dashboard
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Start a new collaboration or join an existing session.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* Create Canvas Card */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Create Canvas</h2>
                            <p className="mt-2 text-gray-600">
                                Start a blank canvas and invite others to collaborate in real-time.
                            </p>
                        </div>
                        <div className="relative z-10 mt-8">
                            <button
                                onClick={handleCreateCanvas}
                                className="inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            >
                                Create New Canvas
                                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Join Canvas Card */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Join Canvas</h2>
                            <p className="mt-2 text-gray-600">
                                Enter a Room ID to jump into an existing collaboration session.
                            </p>
                        </div>
                        <div className="relative z-10 mt-8">
                            <form onSubmit={handleJoinCanvas} className="space-y-4">
                                <div>
                                    <label htmlFor="roomId" className="sr-only">Room ID</label>
                                    <input
                                        type="text"
                                        id="roomId"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                        placeholder="Enter Room ID"
                                        className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-black sm:text-sm transition-all duration-200"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-xl border border-black bg-transparent px-6 py-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                >
                                    Join Canvas
                                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
