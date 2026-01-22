"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black selection:bg-black selection:text-white">
      {/* Hero Section with Full Background */}
      <section className="relative h-screen w-full overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.avif"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Navbar (Transparent) */}
        <nav className="relative z-10 flex h-20 w-full items-center justify-between px-8 md:px-12">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/10 backdrop-blur-md">
              <span className="font-bold">CB</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {/* Burger menu icon similar to reference */}
            <button className="p-2 text-white hover:opacity-80">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="2" fill="white" />
                <rect y="18" width="40" height="2" fill="white" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="relative z-10 flex h-[calc(100vh-80px)] w-full flex-col justify-between px-8 pb-12 pt-10 md:px-12 md:pb-16">

          {/* Center/Top: Massive Title */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="w-full text-center text-[12vw] font-bold leading-none tracking-tighter sm:text-[15vw]">
              CollabBoard
            </h1>
          </div>

          {/* "Since" Text - Positioned relatively to match visual hierarchy */}
          <div className="absolute left-8 top-1/2 -translate-y-12 text-lg font-medium tracking-wide md:left-12 md:text-xl">
            Since 2026
          </div>

          {/* Bottom Section: Grid for Description and CTA */}
          <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-2">

            {/* Bottom Left: Description */}
            <div className="max-w-lg">
              <p className="text-xl font-medium leading-relaxed md:text-2xl">
                We are a creative platform for teams building brands and systems that stand out, scale with growth and deliver measurable results.
              </p>
            </div>

            {/* Bottom Right: Stats and CTA */}
            <div className="flex flex-col items-start justify-end gap-6 md:items-end">
              <div className="flex flex-col items-start gap-1 text-right md:items-end">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-white font-semibold">4.8/5</span>
                </div>
                <p className="font-medium text-white/90">3.2x Average ROI</p>
              </div>

              <div className="flex w-full items-center gap-4 md:w-auto">
                <Link
                  href="/signin"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 md:w-auto"
                >
                  Start your project
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Features Bento Grid */}
        <section id="features" className="bg-gray-50 px-6 py-24">
          <div className="mx-auto max-w-7xl space-y-12">
            <div className="text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-600">Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to visualize logic.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[600px]">
              {/* Feature 1 - Large Left */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2 md:row-span-2">
                <div className="absolute right-0 top-0 h-full w-1/2 translate-x-1/4 bg-blue-50/50 rounded-full blur-3xl" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Infinite Canvas</h3>
                    <p className="mt-4 max-w-md text-gray-500">
                      Never run out of space. Our infinite canvas scales with your ideas, from simple sketches to complex system architectures.
                    </p>
                  </div>
                  {/* Placeholder for a UI mockup */}
                  <div className="mt-8 h-64 w-full rounded-xl border border-gray-100 bg-gray-50 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-4 rounded-lg bg-white shadow-sm flex items-center justify-center">
                      <span className="text-gray-300 font-medium">Interactive Demo Area</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 - Top Right */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Real-time Sync</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Collaborate with your team instantly. Changes reflect in milliseconds.
                </p>
              </div>

              {/* Feature 3 - Bottom Right */}
              <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Secure by Design</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your ideas are safe. Enterprise-grade encryption for all your projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 bg-white">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              <details className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                  <h3 className="text-lg font-medium">Is CollabBoard free to use?</h3>
                  <span className="relative size-5 shrink-0">
                    <svg
                      className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg
                      className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Yes! You can create unlimited public canvases for free. We offer premium plans for private teams and advanced security features.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                  <h3 className="text-lg font-medium">Can I collaborate in real-time?</h3>
                  <span className="relative size-5 shrink-0">
                    <svg
                      className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg
                      className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Absolutely. All drawing and edits happen in real-time, so you can see exactly what your team is thinking as they type or draw.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-black px-6 py-16 text-center text-white sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to bring your ideas to life?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
              Join thousands of teams who use CollabBoard to design better systems, faster.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-transform hover:scale-105"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-black"></div>
            <span className="text-lg font-bold">CollabBoard</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
            <a href="#" className="hover:text-black">Contact</a>
          </div>
          <p className="text-sm text-gray-400">© 2026 CollabBoard Inc.</p>
        </div>
      </footer>
    </div>
  );
}
