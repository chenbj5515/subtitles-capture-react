import { BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsageGuide() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <CardTitle className="text-lg">Usage Guide</CardTitle>
        </div>
        <CardDescription>Keyboard shortcuts for the extension</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-[14px] font-semibold mb-2">Ctrl+C:</h3>
          <p className="text-muted-foreground">
            For Netflix: Open subtitles and press Ctrl+C to copy the current subtitle.
          </p>
          <p className="text-muted-foreground">
            For YouTube: Find a video with built-in Japanese subtitles and press Ctrl+C to copy the current
            screen&apos;s subtitles.
          </p>
        </div>
        <div>
          <h3 className="text-[14px] font-semibold mb-2">Ctrl+R:</h3>
          <p className="text-muted-foreground">Replay the video segment corresponding to the last copied subtitle.</p>
        </div>
      </CardContent>
    </Card>
  )
}

