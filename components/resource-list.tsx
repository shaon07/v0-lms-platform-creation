"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Code, Video, BookOpen, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Resource } from "@/lib/courses-data"

interface ResourceListProps {
  resources: Resource[]
}

function getResourceIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-red-500" />
    case "code":
      return <Code className="w-5 h-5 text-blue-500" />
    case "video":
      return <Video className="w-5 h-5 text-purple-500" />
    case "article":
      return <BookOpen className="w-5 h-5 text-amber-500" />
    default:
      return <FileText className="w-5 h-5 text-gray-500" />
  }
}

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {resources.map((resource) => (
        <Card key={resource.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">{getResourceIcon(resource.type)}</div>
            <div className="flex-1">
              <p className="font-medium mb-1">{resource.title}</p>
              <p className="text-xs text-muted-foreground mb-3 capitalize">{resource.type} file</p>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
