"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, RefreshCw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIMessageGeneratorProps {
  onMessageGenerated: (message: string) => void
  customColors?: any
}

const relationships = [
  "parent",
  "mother",
  "father",
  "child",
  "son",
  "daughter",
  "sibling",
  "brother",
  "sister",
  "spouse",
  "husband",
  "wife",
  "friend",
  "best friend",
  "close friend",
  "grandparent",
  "grandmother",
  "grandfather",
  "cousin",
  "uncle",
  "aunt",
  "nephew",
  "niece",
  "in-law",
  "mother-in-law",
  "father-in-law",
  "colleague",
  "boss",
  "employee",
  "neighbor",
  "teacher",
  "student",
  "mentor",
  "business partner",
  "client",
  "doctor",
  "imam",
  "community leader",
  "elder",
  "younger sibling",
  "older sibling",
  "little sister",
  "little brother",
  "big sister",
  "big brother",
  "custom",
]

const tones = [
  "spiritual",
  "poetic",
  "casual",
  "respectful",
  "inspirational",
  "humorous",
  "formal",
  "emotional",
  "playful",
  "traditional",
  "unique",
]

const languages = [
  { code: "english", name: "English", flag: "🇺🇸" },
  { code: "arabic", name: "Arabic", flag: "🇸🇦" },
  { code: "bengali", name: "Bengali", flag: "🇧🇩" },
  { code: "urdu", name: "Urdu", flag: "🇵🇰" },
  { code: "hindi", name: "Hindi", flag: "🇮🇳" },
  { code: "turkish", name: "Turkish", flag: "🇹🇷" },
  { code: "indonesian", name: "Indonesian", flag: "🇮🇩" },
  { code: "malay", name: "Malay", flag: "🇲🇾" },
  { code: "french", name: "French", flag: "🇫🇷" },
  { code: "spanish", name: "Spanish", flag: "🇪🇸" },
]

interface GeneratedMessages {
  primary: string
  alternatives: string[]
}

export function AIMessageGenerator({ onMessageGenerated, customColors }: AIMessageGeneratorProps) {
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [customRelationship, setCustomRelationship] = useState("")
  const [tone, setTone] = useState("respectful")
  const [language, setLanguage] = useState("english")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedMessages, setGeneratedMessages] = useState<GeneratedMessages | null>(null)

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError("Please enter the recipient's name")
      return
    }

    const actualRelationship = relationship === "custom" ? customRelationship : relationship

    if (!actualRelationship.trim()) {
      setError("Please select or enter a relationship")
      return
    }

    setError(null)
    setIsGenerating(true)
    setGeneratedMessages(null)

    try {
      const response = await fetch("/api/generate-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          relationship: actualRelationship.trim(),
          tone,
          language,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate message")
      }

      const data = await response.json()
      setGeneratedMessages({
        primary: data.primary,
        alternatives: data.alternatives || [],
      })
    } catch (err) {
      setError("Failed to generate message. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUseMessage = (message: string) => {
    onMessageGenerated(message)
    setGeneratedMessages(null)
  }

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-600">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-800 dark:text-emerald-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Message Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipient-name" className="text-emerald-700 dark:text-emerald-200">
              Recipient's Name
            </Label>
            <Input
              id="recipient-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter recipient's name"
              className="border-emerald-200 dark:border-emerald-600 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship" className="text-emerald-700 dark:text-emerald-200">
              Relationship
            </Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger className="border-emerald-200 dark:border-emerald-600 dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <ScrollArea className="h-full">
                  {relationships.map((rel) => (
                    <SelectItem key={rel} value={rel}>
                      {rel === "custom" ? "Custom..." : rel.charAt(0).toUpperCase() + rel.slice(1)}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            {relationship === "custom" && (
              <Input
                value={customRelationship}
                onChange={(e) => setCustomRelationship(e.target.value)}
                placeholder="Enter custom relationship"
                className="mt-2 border-emerald-200 dark:border-emerald-600 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-emerald-700 dark:text-emerald-200">Tone</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {tones.map((t) => (
              <div key={t} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`tone-${t}`}
                  name="tone"
                  value={t}
                  checked={tone === t}
                  onChange={() => setTone(t)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor={`tone-${t}`} className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                  {t === "unique" ? "Unique" : t.charAt(0).toUpperCase() + t.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-emerald-700 dark:text-emerald-200">Language</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`lang-${lang.code}`}
                  name="language"
                  value={lang.code}
                  checked={language === lang.code}
                  onChange={() => setLanguage(lang.code)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <Label
                  htmlFor={`lang-${lang.code}`}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer flex items-center gap-1"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Message
            </>
          )}
        </Button>

        {generatedMessages && (
          <div className="space-y-4 mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="space-y-3">
              <div>
                <Label className="text-emerald-800 dark:text-emerald-200 font-semibold">Primary Message</Label>
                <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded border border-emerald-200 dark:border-emerald-600">
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                    {generatedMessages.primary}
                  </p>
                  <Button
                    onClick={() => handleUseMessage(generatedMessages.primary)}
                    size="sm"
                    className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Use This Message
                  </Button>
                </div>
              </div>

              {generatedMessages.alternatives.length > 0 && (
                <div>
                  <Label className="text-emerald-800 dark:text-emerald-200 font-semibold">Alternative Messages</Label>
                  <div className="mt-2 space-y-2">
                    {generatedMessages.alternatives.map((alt, index) => (
                      <div
                        key={index}
                        className="p-3 bg-white dark:bg-gray-800 rounded border border-emerald-200 dark:border-emerald-600"
                      >
                        <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{alt}</p>
                        <Button
                          onClick={() => handleUseMessage(alt)}
                          size="sm"
                          variant="outline"
                          className="mt-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        >
                          Use This Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={handleGenerate}
              variant="outline"
              size="sm"
              className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Messages
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
