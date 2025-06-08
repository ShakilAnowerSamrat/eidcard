"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { messageTemplates } from "@/lib/templates"

interface MessageTemplateSelectorProps {
  onTemplateSelect: (message: string) => void
}

export function MessageTemplateSelector({ onTemplateSelect }: MessageTemplateSelectorProps) {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-emerald-200 dark:border-emerald-600">
      <CardHeader className="pb-4">
        <CardTitle className="text-emerald-800 dark:text-emerald-100">Message Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-100 dark:bg-gray-700">
            <TabsTrigger value="general" className="text-xs sm:text-sm dark:text-gray-200">
              General
            </TabsTrigger>
            <TabsTrigger value="family" className="text-xs sm:text-sm dark:text-gray-200">
              Family
            </TabsTrigger>
            <TabsTrigger value="friends" className="text-xs sm:text-sm dark:text-gray-200">
              Friends
            </TabsTrigger>
            <TabsTrigger value="formal" className="text-xs sm:text-sm dark:text-gray-200">
              Formal
            </TabsTrigger>
          </TabsList>

          {Object.entries(messageTemplates).map(([category, templates]) => (
            <TabsContent key={category} value={category} className="mt-4">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {templates.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full h-auto p-3 text-left justify-start border-emerald-200 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:text-gray-200"
                      onClick={() => onTemplateSelect(template.text)}
                    >
                      <div className="w-full">
                        <div className="font-medium text-sm text-emerald-800 dark:text-emerald-200 mb-1">
                          {template.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{template.text}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
