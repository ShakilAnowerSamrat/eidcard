"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CroissantIcon as Crescent, Star, ChurchIcon as Mosque, Sparkles, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Optimized Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Islamic Geometric Patterns */}
        <div className="absolute top-20 left-10 opacity-30">
          <div className="w-16 h-16 border-2 border-emerald-300 rounded-full animate-float-slow">
            <div className="w-8 h-8 bg-emerald-200 rounded-full m-auto mt-4 animate-pulse-gentle"></div>
          </div>
        </div>

        <div className="absolute top-40 right-20 opacity-25">
          <div className="w-12 h-12 border-2 border-amber-300 transform rotate-45 animate-float-medium">
            <div className="w-4 h-4 bg-amber-200 m-auto mt-4 animate-pulse-gentle"></div>
          </div>
        </div>

        {/* Floating Stars with Optimized Animation */}
        <div className="absolute top-32 left-1/4 animate-twinkle">
          <Star className="h-6 w-6 text-amber-400 opacity-60" />
        </div>
        <div className="absolute top-60 right-1/3 animate-twinkle-delayed">
          <Star className="h-4 w-4 text-amber-500 opacity-50" />
        </div>
        <div className="absolute bottom-40 left-1/3 animate-twinkle-slow">
          <Star className="h-5 w-5 text-amber-400 opacity-40" />
        </div>

        {/* Floating Crescents with Gentle Movement */}
        <div className="absolute top-1/3 right-16 animate-sway">
          <Crescent className="h-8 w-8 text-emerald-400 opacity-30" />
        </div>
        <div className="absolute bottom-1/3 left-20 animate-sway-reverse">
          <Crescent className="h-6 w-6 text-emerald-500 opacity-35" />
        </div>

        {/* Mosque Silhouettes */}
        <div className="absolute top-1/2 right-12 animate-breathe">
          <Mosque className="h-10 w-10 text-emerald-600 opacity-20" />
        </div>
        <div className="absolute bottom-1/4 left-1/2 animate-breathe-delayed">
          <Mosque className="h-8 w-8 text-emerald-500 opacity-25" />
        </div>

        {/* Sparkle Effects */}
        <div className="absolute top-1/4 left-1/2 animate-sparkle">
          <Sparkles className="h-5 w-5 text-amber-400 opacity-40" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-sparkle-delayed">
          <Sparkles className="h-4 w-4 text-emerald-400 opacity-35" />
        </div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative">
            <Crescent className="h-8 w-8 text-emerald-600 dark:text-emerald-400 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:text-emerald-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse-gentle"></div>
          </div>
          <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 transition-all duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
            EidGreetings
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center space-y-8">
          {/* Enhanced Decorative Elements */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="relative group">
              <Star className="h-12 w-12 text-amber-500 animate-rotate-gentle group-hover:animate-spin-fast transition-all duration-300" />
              <div className="absolute inset-0 bg-amber-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse-gentle blur-sm"></div>
            </div>
            <div className="relative group">
              <Mosque className="h-16 w-16 text-emerald-600 dark:text-emerald-400 transition-all duration-500 group-hover:scale-110 animate-breathe" />
              <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse-gentle blur-lg"></div>
            </div>
            <div className="relative group">
              <Star className="h-12 w-12 text-amber-500 animate-rotate-gentle-reverse group-hover:animate-spin-fast-reverse transition-all duration-300" />
              <div className="absolute inset-0 bg-amber-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse-gentle blur-sm"></div>
            </div>
          </div>

          {/* Main Heading with Enhanced Animation */}
          <div className="space-y-4">
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold text-emerald-800 dark:text-emerald-200 animate-slide-up">
                Eid Mubarak
              </h2>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse-gentle opacity-60 shadow-lg"></div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-expand"></div>
            </div>
            <p className="text-xl md:text-2xl text-emerald-700 dark:text-emerald-300 font-semibold animate-slide-up-delayed opacity-0">
              عيد أضحى مبارك
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-delayed opacity-0">
              Create beautiful, personalized Eid-ul-Adha greeting cards to share with your loved ones. Celebrate this
              blessed occasion with heartfelt messages and elegant designs.
            </p>
          </div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-700 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-card-appear group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="relative mb-4 inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-800 dark:to-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    <Crescent className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse-gentle"></div>
                </div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-300">
                  Create Greetings
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Design personalized Eid greeting cards with custom messages and beautiful Islamic themes
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-700 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-card-appear-delayed group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="relative mb-4 inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    <Sparkles className="h-8 w-8 text-amber-600 dark:text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-amber-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse-gentle blur-md"></div>
                </div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors duration-300">
                  AI-Powered
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Generate personalized messages with AI in multiple languages including Arabic and Bengali
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-700 hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 animate-card-appear-delayed-2 group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-6 text-center relative z-10">
                <div className="relative mb-4 inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    <Mosque className="h-8 w-8 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse-gentle blur-md"></div>
                </div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-300 transition-colors duration-300">
                  Save & Share
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Store your greetings securely and share them with family and friends across social platforms
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fade-in-up opacity-0">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
            >
              <Link href="/create">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Crescent className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
                <span className="relative z-10">Create Greeting Card</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 px-8 py-3 text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
            >
              <Link href="/greetings">
                <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Star className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180 relative z-10" />
                <span className="relative z-10">View My Greetings</span>
              </Link>
            </Button>
          </div>

          {/* Enhanced Decorative Pattern */}
          <div className="mt-16 opacity-30 animate-fade-in-up opacity-0">
            <div className="flex justify-center space-x-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-3 animate-float-pattern"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <Crescent className="h-5 w-5 text-emerald-600 animate-sway" />
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent"></div>
                  <Star className="h-4 w-4 text-amber-500 animate-twinkle" />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Floating Eid Wishes */}
          <div className="mt-12 space-y-4 animate-fade-in-up opacity-0">
            <div className="flex flex-wrap justify-center gap-6 text-emerald-700 dark:text-emerald-300 font-semibold">
              <span className="flex items-center space-x-2 animate-float-gentle">
                <span className="text-2xl">🌙</span>
                <span>Blessed Eid</span>
              </span>
              <span className="flex items-center space-x-2 animate-float-gentle-delayed">
                <span className="text-2xl">⭐</span>
                <span>Peace & Joy</span>
              </span>
              <span className="flex items-center space-x-2 animate-float-gentle-delayed-2">
                <span className="text-2xl">🕌</span>
                <span>Divine Blessings</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="mt-20 py-8 border-t border-emerald-200 dark:border-emerald-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Crescent className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-sway" />
            <Star className="h-4 w-4 text-amber-500 animate-twinkle" />
            <Mosque className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-breathe" />
            <Star className="h-4 w-4 text-amber-500 animate-twinkle-delayed" />
            <Crescent className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-sway-reverse" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            Developed by{" "}
            <a
              href="https://www.softsasi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-all duration-300 hover:underline hover:scale-105 inline-block"
            >
              Softsasi
            </a>
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
            <Heart className="h-3 w-3 text-red-400 animate-pulse-gentle" />
            <span>May this Eid bring peace, happiness, and prosperity to all</span>
            <span className="text-lg">🌙✨</span>
          </div>
        </div>
      </footer>

      {/* Optimized CSS Animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(5deg); }
        }

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes rotate-gentle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 6rem; }
        }

        @keyframes card-appear {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float-pattern {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-slide-up-delayed {
          animation: slide-up 1s ease-out 0.3s forwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-up 1s ease-out 0.6s forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 1s forwards;
        }

        .animate-card-appear {
          animation: card-appear 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }

        .animate-card-appear-delayed {
          animation: card-appear 0.8s ease-out 1s forwards;
          opacity: 0;
        }

        .animate-card-appear-delayed-2 {
          animation: card-appear 0.8s ease-out 1.2s forwards;
          opacity: 0;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-float-gentle-delayed {
          animation: float-gentle 3s ease-in-out infinite 0.5s;
        }

        .animate-float-gentle-delayed-2 {
          animation: float-gentle 3s ease-in-out infinite 1s;
        }

        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }

        .animate-sway-reverse {
          animation: sway 4s ease-in-out infinite reverse;
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }

        .animate-breathe-delayed {
          animation: breathe 3s ease-in-out infinite 1s;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-twinkle-delayed {
          animation: twinkle 2s ease-in-out infinite 0.5s;
        }

        .animate-twinkle-slow {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animate-rotate-gentle {
          animation: rotate-gentle 8s linear infinite;
        }

        .animate-rotate-gentle-reverse {
          animation: rotate-gentle 8s linear infinite reverse;
        }

        .animate-spin-fast {
          animation: rotate-gentle 0.5s linear infinite;
        }

        .animate-spin-fast-reverse {
          animation: rotate-gentle 0.5s linear infinite reverse;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 2.5s ease-in-out infinite;
        }

        .animate-sparkle-delayed {
          animation: sparkle 2.5s ease-in-out infinite 1s;
        }

        .animate-expand {
          animation: expand 1.5s ease-out 1.8s forwards;
          width: 0;
        }

        .animate-float-pattern {
          animation: float-pattern 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }

        /* Performance optimizations */
        .animate-slide-up,
        .animate-fade-in-up,
        .animate-card-appear,
        .animate-card-appear-delayed,
        .animate-card-appear-delayed-2 {
          will-change: transform, opacity;
        }

        .animate-float-gentle,
        .animate-sway,
        .animate-breathe,
        .animate-twinkle,
        .animate-rotate-gentle {
          will-change: transform;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
