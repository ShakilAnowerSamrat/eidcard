"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { CustomColors } from "@/types/greeting"

interface ColorCustomizerProps {
  colors: CustomColors
  onColorsChange: (colors: CustomColors) => void
}

const colorPresets = [
  {
    name: "Emerald Classic",
    colors: { primary: "#059669", secondary: "#0d9488", accent: "#f59e0b", background: "#ecfdf5" },
  },
  {
    name: "Royal Blue",
    colors: { primary: "#1d4ed8", secondary: "#0ea5e9", accent: "#f59e0b", background: "#eff6ff" },
  },
  {
    name: "Golden Sunset",
    colors: { primary: "#d97706", secondary: "#ea580c", accent: "#dc2626", background: "#fefce8" },
  },
  {
    name: "Purple Majesty",
    colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#f59e0b", background: "#faf5ff" },
  },
  {
    name: "Rose Garden",
    colors: { primary: "#e11d48", secondary: "#f43f5e", accent: "#f59e0b", background: "#fff1f2" },
  },
  {
    name: "Forest Green",
    colors: { primary: "#166534", secondary: "#15803d", accent: "#ca8a04", background: "#f0fdf4" },
  },
]

export function ColorCustomizer({ colors, onColorsChange }: ColorCustomizerProps) {
  const handleColorChange = (colorKey: keyof CustomColors, value: string) => {
    onColorsChange({
      ...colors,
      [colorKey]: value,
    })
  }

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-600">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-800 dark:text-emerald-100">Color Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Presets */}
        <div className="space-y-3">
          <Label className="text-emerald-700 dark:text-emerald-200">Color Presets</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {colorPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="h-auto p-3 border-emerald-200 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:text-gray-200"
                onClick={() => onColorsChange(preset.colors)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.secondary }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
                  </div>
                  <span className="text-xs font-medium flex-1 text-left">{preset.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-4">
          <Label className="text-emerald-700 dark:text-emerald-200">Custom Colors</Label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary" className="text-sm dark:text-gray-200">
                Primary Color
              </Label>
              <div className="flex space-x-2">
                <input
                  id="primary"
                  type="color"
                  value={colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="w-12 h-10 rounded border border-emerald-200 dark:border-emerald-600"
                />
                <input
                  type="text"
                  value={colors.primary}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-emerald-200 dark:border-emerald-600 rounded focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary" className="text-sm dark:text-gray-200">
                Secondary Color
              </Label>
              <div className="flex space-x-2">
                <input
                  id="secondary"
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="w-12 h-10 rounded border border-emerald-200 dark:border-emerald-600"
                />
                <input
                  type="text"
                  value={colors.secondary}
                  onChange={(e) => handleColorChange("secondary", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-emerald-200 dark:border-emerald-600 rounded focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent" className="text-sm dark:text-gray-200">
                Accent Color
              </Label>
              <div className="flex space-x-2">
                <input
                  id="accent"
                  type="color"
                  value={colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="w-12 h-10 rounded border border-emerald-200 dark:border-emerald-600"
                />
                <input
                  type="text"
                  value={colors.accent}
                  onChange={(e) => handleColorChange("accent", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-emerald-200 dark:border-emerald-600 rounded focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background" className="text-sm dark:text-gray-200">
                Background Color
              </Label>
              <div className="flex space-x-2">
                <input
                  id="background"
                  type="color"
                  value={colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="w-12 h-10 rounded border border-emerald-200 dark:border-emerald-600"
                />
                <input
                  type="text"
                  value={colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-emerald-200 dark:border-emerald-600 rounded focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
