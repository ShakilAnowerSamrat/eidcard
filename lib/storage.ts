import { getSupabaseBrowserClient } from "./supabase"
import type { FrameStyle, CustomColors } from "@/types/greeting"

export interface Greeting {
  id: string
  senderName: string
  recipientName: string
  message: string
  frameStyle?: FrameStyle
  customColors?: CustomColors
  cardSize?: "small" | "medium" | "large"
  createdAt: string
}

// Convert from Supabase format to our app format
function mapFromSupabase(item: any): Greeting {
  return {
    id: item.id,
    senderName: item.sender_name,
    recipientName: item.recipient_name,
    message: item.message,
    frameStyle: item.frame_style,
    customColors: item.custom_colors,
    cardSize: item.card_size,
    createdAt: item.created_at,
  }
}

// Convert from our app format to Supabase format
function mapToSupabase(greeting: Greeting) {
  return {
    id: greeting.id,
    sender_name: greeting.senderName,
    recipient_name: greeting.recipientName,
    message: greeting.message,
    frame_style: greeting.frameStyle,
    custom_colors: greeting.customColors,
    card_size: greeting.cardSize,
    created_at: greeting.createdAt,
  }
}

export async function getGreetings(): Promise<Greeting[]> {
  try {
    const supabase = getSupabaseBrowserClient()
    const { data, error } = await supabase.from("greetings").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching greetings:", error)
      return getLocalGreetings() // Fallback to localStorage
    }

    return data.map(mapFromSupabase)
  } catch (error) {
    console.error("Error loading greetings:", error)
    return getLocalGreetings() // Fallback to localStorage
  }
}

export async function saveGreeting(greeting: Greeting): Promise<Greeting | null> {
  try {
    const supabase = getSupabaseBrowserClient()

    // Don't include ID when inserting - let Supabase generate it
    const greetingToInsert = {
      sender_name: greeting.senderName,
      recipient_name: greeting.recipientName,
      message: greeting.message,
      frame_style: greeting.frameStyle,
      custom_colors: greeting.customColors,
      card_size: greeting.cardSize,
      created_at: greeting.createdAt,
    }

    const { data, error } = await supabase.from("greetings").insert(greetingToInsert).select().single()

    if (error) {
      console.error("Error saving greeting:", error)
      saveLocalGreeting(greeting) // Fallback to localStorage
      return null
    }

    return mapFromSupabase(data)
  } catch (error) {
    console.error("Error saving greeting:", error)
    saveLocalGreeting(greeting) // Fallback to localStorage
    return null
  }
}

export async function deleteGreeting(id: string): Promise<boolean> {
  try {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.from("greetings").delete().eq("id", id)

    if (error) {
      console.error("Error deleting greeting:", error)
      deleteLocalGreeting(id) // Fallback to localStorage
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting greeting:", error)
    deleteLocalGreeting(id) // Fallback to localStorage
    return false
  }
}

// Fallback to localStorage for offline functionality
const STORAGE_KEY = "eid-greetings"

export function getLocalGreetings(): Greeting[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading local greetings:", error)
    return []
  }
}

export function saveLocalGreeting(greeting: Greeting): void {
  if (typeof window === "undefined") return

  try {
    const greetings = getLocalGreetings()
    // Ensure local greeting has an ID
    const greetingWithId = {
      ...greeting,
      id: greeting.id || Date.now().toString(),
    }
    greetings.unshift(greetingWithId) // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(greetings))
  } catch (error) {
    console.error("Error saving local greeting:", error)
  }
}

export function deleteLocalGreeting(id: string): void {
  if (typeof window === "undefined") return

  try {
    const greetings = getLocalGreetings()
    const filtered = greetings.filter((g) => g.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error("Error deleting local greeting:", error)
  }
}
