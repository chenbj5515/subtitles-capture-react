"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import Link from "next/link"

export default function ApiKeyForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Add your API key saving logic here
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">
            Visit the{" "}
            <Link
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              official OpenAI settings page
            </Link>{" "}
            to obtain your key.
          </p>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save Settings
        </Button>
      </form>

      <Alert>
        <AlertDescription>Please keep your API Key safe and do not share it with others.</AlertDescription>
      </Alert>
    </div>
  )
}

