import React from 'react'
import Logo3D from '@/components/Logo3D'

export default function Page() {
  return (
    <main className="min-h-screen w-screen bg-gradient-to-b from-black via-[#0a0a15] to-[#07070a] flex flex-col items-center justify-center overflow-hidden relative px-4">
      
      {/* Coming Soon Text - At Top */}
      

      <section className="w-full flex items-center justify-center relative z-10">
        <div className="w-full max-w-[1100px]">
          
          {/* Glass Card with 3D Logo */}
          <div className="relative h-[50vh] md:h-[60vh] rounded-2xl backdrop-blur-sm overflow-hidden group hover:shadow-[0_12px_80px_rgba(0,150,255,0.3)] transition-all duration-500">
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-400/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* 3D Logo */}
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <Logo3D />
            </div>

            {/* Floating orbs decoration */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          </div>

          {/* Social Info at Bottom */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left side - Brand info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Yakush Studio Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-100">Yakush Studio </h3>
                <p className="text-sm text-blue-300/60">Innovating the digital space</p>
              </div>
            </div>

            {/* Right side - Social links */}
            <div className="flex items-center gap-6">
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/yakush-studio/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300/80 hover:text-cyan-400 transition-colors duration-300 group"
                aria-label="Visit our LinkedIn"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/yakushstudio/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300/80 hover:text-cyan-400 transition-colors duration-300 group"
                aria-label="Visit our Instagram"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>

              {/* X (Twitter) */}
              <a 
                href="https://x.com/yakushstudio" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300/80 hover:text-cyan-400 transition-colors duration-300 group"
                aria-label="Visit our X profile"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
              </a>

            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-sm text-blue-300/40">
            © 2025 Yakush Studio LTD. All rights reserved.
          </div>
        </div>
      </section>
    </main>
  )
}