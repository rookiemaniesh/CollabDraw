"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Globe, MessageSquare, Menu, X, Pencil, Sparkles, Brain, HandMetal, Smile, StickyNote, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-pink-500 selection:text-white font-sans overflow-x-hidden">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex h-20 w-full items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-15">
          <img src="/logocb.jpg-removebg-preview.png" alt="" />
          </div>

          <span className="text-xl font-bold tracking-tight">CollabBoard</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-300 hover:text-white">
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="https://github.com/rookiemaniesh/CollabDraw" className="hover:text-white transition-colors">Github</Link>
          <Link
            href="/signin"
            className="px-6 py-2 rounded-full bg-[#1E1E1E] text-white border border-gray-800 hover:bg-[#2a2a2a] transition-all hover:border-gray-700 font-semibold"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-20 px-6 pb-20">

        {/* Floating Decorative Elements Top */}
        

        <div className="absolute top-28 left-[15%] hidden md:block animate-float">
          <Brain className="w-12 h-12 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="absolute top-32 right-[15%] hidden md:block animate-bounce-slow">
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
              </div>
              <div className="absolute -right-2 top-0 rotate-12">
                <Video className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-8">
            An Intuitive Online <span className="relative inline-block text-yellow-300">
              Whiteboard
              {/* <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg> */}
            </span> For
            <br className="hidden md:block" />
            Teams To Ideate And Collaborate
            <br className="hidden md:block" />
            In <span className="relative inline-block text-pink-400">
              Real-Time
              {/* <span className="absolute w-full h-4 -bottom-1 left-0 bg-pink-500/20 -rotate-1 rounded-sm -z-10"></span> */}
            </span> [BETA]
          </h1>

          {/* CTA Area with Arrows and Floating Elements */}
          <div className="relative inline-block mt-12 mb-20">
            {/* Left Arrow */}
            {/* <div className="absolute -left-72 top-1/2 -translate-y-1/2 hidden md:block">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="text-gray-500 -rotate-12">
                <path d="M80 10 C 50 10, 20 40, 20 50" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M20 50 L 15 40 M 20 50 L 30 45" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div> */}
            {/* Right Arrow */}
            {/* <div className="absolute -right-32 top-0 hidden md:block">
              <svg width="80" height="50" viewBox="0 0 80 50" fill="none" className="text-gray-500 rotate-12">
                <path d="M20 40 C 40 40, 60 20, 70 10" stroke="currentColor" strokeWidth="2" />
                <path d="M70 10 L 60 10 M 70 10 L 70 20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div> */}

            {/* Video Play Button Floating */}
            {/* <div className="absolute -left-60 -top-16 hidden md:block animate-float">
              <div className="w-12 h-10 border-2 border-gray-600 rounded-lg flex items-center justify-center rotate-[-15deg]">
                <Play className="w-4 h-4 fill-current text-gray-400" />
              </div>
            </div> */}

            {/* OK Hand Floating */}
            {/* <div className="absolute -right-24 -top-10 hidden md:block animate-float-slow">
              <div className="text-4xl rotate-12">👌</div>
              <div className="absolute -top-4 -right-4 bg-black text-white text-xs font-bold px-2 py-1 rounded-full border border-gray-700 -rotate-12">OK!</div>
            </div> */}

            <Link
              href="/signin"
              className="relative z-20 px-10 py-4 bg-[#2D2D2D] hover:bg-[#3d3d3d] text-white text-lg font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20 border border-gray-700"
            >
              Start For Free
            </Link>
          </div>
        </div>

      
        

        {/* Laptop Mockup Container */}
        <div className="relative w-full max-w-5xl mx-auto perspective-1000">
          {/* Cursors hovering over laptop */}
          {/* <div className="absolute -top-10 left-[20%] z-20 hidden md:block animate-float-slow">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="2" className="drop-shadow-lg">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>
          </div>
          <div className="absolute top-[30%] -right-[5%] z-20 hidden md:block animate-float">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#EC4899" stroke="white" strokeWidth="2" className="drop-shadow-lg">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>
            <div className="absolute top-6 left-4 bg-[#EC4899] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">Sarah</div>
          </div> */}

          <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-gray-800 bg-[#0a0a0a]">
            {/* Browser Bar Mockup */}
            <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 py-0.5 bg-[#0a0a0a] rounded-md text-[10px] text-gray-500 flex items-center gap-1 w-64 justify-center border border-gray-800">
                  <span className="w-2 h-2 rounded-full bg-gray-700"></span>
                  CollabBoard.pierates.dev
                </div>
              </div>
            </div>

            {/* Laptop Image */}
            <div className="relative aspect-[16/10] bg-black">
              <Image
                src="/laptop_mockup.png"
                alt="CollabBoard Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Glow Effect behind laptop */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-2xl -z-10 rounded-xl"></div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800  px-6 py-12 mt-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">CollabBoard</span>
          </div>
          <div className="flex  text-sm text-gray-400">
            Made by Manish with ♡
          </div>
          <p className="text-sm text-gray-500">© 2026 CollabBoard Inc.</p>
        </div>
      </footer>
    </div>
  );
}

