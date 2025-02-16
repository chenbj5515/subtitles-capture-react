import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UsageGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Usage Guide</CardTitle>
        <CardDescription>Keyboard shortcuts for the extension</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-[16px] font-semibold mb-2">Ctrl+C:</h3>
          <p className="text-muted-foreground">
            For Netflix: Open subtitles and press Ctrl+C to copy the current subtitle.
          </p>
          <p className="text-muted-foreground">
            For YouTube: Find a video with built-in Japanese subtitles and press Ctrl+C to copy the current
            screen&apos;s subtitles.
          </p>
        </div>
        <div>
          <h3 className="text-[16px] font-semibold mb-2">Ctrl+R:</h3>
          <p className="text-muted-foreground">Replay the video segment corresponding to the last copied subtitle.</p>
        </div>
      </CardContent>
    </Card>
  )
}

