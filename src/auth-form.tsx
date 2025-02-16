"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onGitHubSignIn() {
    try {
      setIsLoading(true)
      const response = await fetch("https://japanese-memory-auth.chenbj55150220.workers.dev/auth/github/login", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("获取 GitHub 登录链接失败")
      }
      const data = await response.json()
      window.open(data.authUrl, "_blank")
    } catch (error) {
      console.error("GitHub 登录错误：", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onGoogleSignIn() {
    // try {
    //   setIsLoading(true)
    //   // 在新的 tab 中打开 auth.html
    //   window.open("https://japanese-memory-auth.chenbj55150220.workers.dev", "_blank")
    // } catch (error) {
    //   console.error("打开 auth.html 错误：", error)
    // } finally {
    //   setIsLoading(false)
    // }
    try {
      setIsLoading(true)
      const response = await fetch("https://japanese-memory-auth.chenbj55150220.workers.dev/auth/google/login", {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("获取 Google 登录链接失败")
      }
      const data = await response.json()
      window.open(data.authUrl, "_blank")
    } catch (error) {
      console.error("Google 登录错误：", error)
    } finally {
      setIsLoading(false)
    }
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