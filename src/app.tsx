import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ApiKeyForm from "./api-key-form"
import AuthForm from "./auth-form"
import UsageGuide from "./usage-guide"
import { ArrowRight, Key, UserCircle } from "lucide-react"

// This would come from your auth state management
const isLoggedIn = false
const isPaidUser = false

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Settings</h1>

      {!isLoggedIn && (
        <>
          <div className="text-lg text-muted-foreground mb-8">
            Choose one of the following options to use the extension:
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 relative">
            <Card className="relative hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserCircle className="h-6 w-6" />
                  <CardTitle className="text-xl">Sign in</CardTitle>
                </div>
                <CardDescription>
                  Sign in with GitHub or Google to access premium features without an API key
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm />
              </CardContent>
            </Card>

            {/* Vertical OR separator */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden">
              <div className="bg-background px-4 py-2 rounded-full text-sm border">OR</div>
            </div>

            {/* Horizontal OR separator for mobile */}
            <div className="md:hidden flex items-center justify-center">
              <div className="bg-background px-4 py-2 rounded-full text-sm border">OR</div>
            </div>

            <Card className="relative hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-6 w-6" />
                  <CardTitle className="text-xl">Use API Key</CardTitle>
                </div>
                <CardDescription>
                  Provide your own OpenAI API key to use the extension without an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApiKeyForm />
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {isLoggedIn && !isPaidUser && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upgrade to Premium</CardTitle>
            <CardDescription>Get access to all features without needing an API key</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Premium Features</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>No API key required</li>
                  <li>Unlimited subtitle translations</li>
                  <li>Priority support</li>
                </ul>
              </div>
              <Button className="flex items-center gap-2">
                Subscribe Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              Don&apos;t want to subscribe? You can still use the extension with your own API key below.
            </div>
            <ApiKeyForm />
          </CardContent>
        </Card>
      )}

      {isLoggedIn && isPaidUser && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Premium Account</CardTitle>
            <CardDescription>You have full access to all features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Your premium subscription is active. You can use all features without an API key.
            </div>
          </CardContent>
        </Card>
      )}

      <UsageGuide />
    </div>
  )
}