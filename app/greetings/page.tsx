"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Share2,
  Download,
  CroissantIcon as Crescent,
  Loader2,
  Star,
  ChurchIcon as Mosque,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { GreetingCard } from "@/components/greeting-card"
import { getGreetings, deleteGreeting, getLocalGreetings, deleteLocalGreeting, type Greeting } from "@/lib/storage"
import { exportAsImage } from "@/lib/image-export"
import { useToast } from "@/hooks/use-toast"

export default function GreetingsPage() {
  const [greetings, setGreetings] = useState<Greeting[]>([])
  const [localGreetings, setLocalGreetings] = useState<Greeting[]>([])
  const [exportingId, setExportingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { toast } = useToast()

  useEffect(() => {
    async function loadGreetings() {
      try {
        // Load from Supabase
        const supabaseGreetings = await getGreetings()
        setGreetings(supabaseGreetings)

        // Load from localStorage as fallback
        setLocalGreetings(getLocalGreetings())
      } catch (error) {
        console.error("Error loading greetings:", error)
        toast({
          title: "Error Loading Greetings",
          description: "There was a problem loading your greetings.",
          variant: "destructive",
        })

        // Fallback to local storage
        setLocalGreetings(getLocalGreetings())
      } finally {
        setIsLoading(false)
      }
    }

    loadGreetings()
  }, [toast])

  const handleDelete = async (id: string, isLocal = false) => {
    setIsDeleting(id)

    try {
      if (isLocal) {
        deleteLocalGreeting(id)
        setLocalGreetings(getLocalGreetings())
      } else {
        const success = await deleteGreeting(id)
        if (success) {
          setGreetings(greetings.filter((g) => g.id !== id))
        } else {
          throw new Error("Failed to delete greeting")
        }
      }

      toast({
        title: "Greeting Deleted",
        description: "The greeting card has been removed.",
      })
    } catch (error) {
      console.error("Error deleting greeting:", error)
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the greeting card.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleShare = async (greeting: Greeting) => {
    const shareText = `Eid Mubarak! ${greeting.message}\n\nFrom: ${greeting.senderName}\nTo: ${greeting.recipientName}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Eid Greeting",
          text: shareText,
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText)
        toast({
          title: "Copied to Clipboard",
          description: "Greeting text has been copied to your clipboard.",
        })
      }
    } else {
      navigator.clipboard.writeText(shareText)
      toast({
        title: "Copied to Clipboard",
        description: "Greeting text has been copied to your clipboard.",
      })
    }
  }

  const handleExportImage = async (greeting: Greeting, format: "png" | "jpeg") => {
    const cardElement = cardRefs.current[greeting.id]
    if (!cardElement) return

    setExportingId(greeting.id)
    try {
      await exportAsImage(cardElement, `eid-greeting-${greeting.recipientName}-${Date.now()}`, format)
      toast({
        title: "Image Exported!",
        description: `Greeting card saved as ${format.toUpperCase()}.`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the greeting card.",
        variant: "destructive",
      })
    } finally {
      setExportingId(null)
    }
  }

  // Combine both sources of greetings
  const allGreetings = [...greetings, ...localGreetings.filter((lg) => !greetings.some((g) => g.id === lg.id))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="dark:text-gray-200 dark:hover:bg-gray-700">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center space-x-2">
            <Crescent className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">My Greetings</h1>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            <span className="ml-2 text-emerald-800 dark:text-emerald-200">Loading greetings...</span>
          </div>
        ) : allGreetings.length === 0 ? (
          <div className="text-center py-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-700 max-w-md mx-auto">
              <CardContent className="p-8">
                <Crescent className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">No Greetings Yet</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You haven't created any Eid greeting cards yet. Start creating beautiful greetings to share with your
                  loved ones.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Greeting
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                Your Eid Greetings ({allGreetings.length})
              </h2>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allGreetings.map((greeting) => {
                const isLocal = localGreetings.some((lg) => lg.id === greeting.id)

                return (
                  <div key={greeting.id} className="space-y-3">
                    <div ref={(el) => (cardRefs.current[greeting.id] = el)}>
                      <GreetingCard
                        senderName={greeting.senderName}
                        recipientName={greeting.recipientName}
                        message={greeting.message}
                        frameStyle={greeting.frameStyle}
                        customColors={greeting.customColors}
                        cardSize={greeting.cardSize}
                        isPreview={false}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(greeting)}
                          className="flex-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(greeting.id, isLocal)}
                          disabled={isDeleting === greeting.id}
                          className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          {isDeleting === greeting.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportImage(greeting, "png")}
                          disabled={exportingId === greeting.id}
                          className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {exportingId === greeting.id ? "Exporting..." : "PNG"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportImage(greeting, "jpeg")}
                          disabled={exportingId === greeting.id}
                          className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {exportingId === greeting.id ? "Exporting..." : "JPEG"}
                        </Button>
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Created {new Date(greeting.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                        {greeting.frameStyle || "classic"} • {greeting.cardSize || "medium"}
                        {isLocal && " • Stored locally"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-emerald-200 dark:border-emerald-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Crescent className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <Star className="h-4 w-4 text-amber-500 animate-bounce" />
            <Mosque className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Developed by{" "}
            <a
              href="https://www.softsasi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors duration-300 hover:underline"
            >
              Softsasi
            </a>
          </p>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            May this Eid bring peace, happiness, and prosperity to all 🌙✨
          </div>
        </div>
      </footer>
    </div>
  )
}
