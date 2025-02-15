import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onGitHubSignIn() {
    setIsLoading(true)
    // Add your GitHub authentication logic here
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  async function onGoogleSignIn() {
    setIsLoading(true)
    // Add your Google authentication logic here
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid gap-4">
      <Button variant="outline" type="button" disabled={isLoading} className="w-full" onClick={onGitHubSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-4 w-4" />
        )}
        Sign in with GitHub
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} className="w-full" onClick={onGoogleSignIn}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Sign in with Google
      </Button>
    </div>
  )
}

