import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ApiKeyForm from "./api-key-form"
import AuthForm from "./auth-form"
import UsageGuide from "./usage-guide"
import { Key, UserCircle } from "lucide-react"
import SubscriptionPrompt from "./subscription-prompt"

// 定义用户类型
interface User {
  user_id: string
  current_plan: string | null
  profile: string
  name: string
}

export default function SettingsPage() {
  // 保存用户信息，若无法获取则为 null
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  console.log(user, "user================")
  // 请求 /api/user/info 接口，获取用户信息
  useEffect(() => {
    fetch("https://japanese-memory-auth.chenbj55150220.workers.dev/api/user/info", {
      // 带上 cookie 信息
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("网络错误")
        }
        return res.json()
      })
      .then((data) => {
        // 假设接口返回的数据包含 id 和 username 字段
        if (data?.user) {
          setUser(data.user)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("获取用户信息失败：", err)
        setLoading(false)
      })
  }, [])

  // 点击"订阅引导"时，打开新的 tab 访问订阅引导页（替换下面的 URL）
  const handleSubscribeGuide = () => {
    window.open("https://your-subscription-guide-url.com", "_blank")
  }

  // TODO: 订阅引导页
  // TODO: 无账号时自动注册？
  // TODO: 订阅用户的 API Key 管理
  // TODO: 自带API Key管理

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {loading && <p>加载中...</p>}

      {/* 当能获取到用户信息时，在 Settings 上方显示头像和用户名 */}
      {!loading && user && user.user_id && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={`https://japanese-memory-rsc.vercel.app${user.profile}`}
              alt="用户头像"
              className="h-10 w-10 rounded-full mr-2"
            />
            <span className="text-[12px] font-medium">{user.name}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-[12px] text-white bg-black"
            onClick={() => {
              fetch("https://japanese-memory-auth.chenbj55150220.workers.dev/auth/logout", {
                credentials: "include"
              }).then(() => {
                window.location.reload()
              })
            }}
          >
            Sign Out
          </Button>
        </div>
      )}

      {/* 没有获取到用户信息（未登录）时，展示原有的 Sign in 和 Use API Key 选项 */}
      {!loading && !user && (
        <>
          <h1 className="text-2xl font-bold mb-6">Missing OpenAI API Key</h1>
          <div className="text-[16px] text-muted-foreground mb-5">
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

            {/* 垂直 OR 分隔符 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden">
              <div className="bg-background px-4 py-2 rounded-full text-sm border">OR</div>
            </div>

            {/* 移动端水平 OR 分隔符 */}
            <div className="md:hidden flex items-center justify-center">
              <div className="bg-background px-4 py-2 rounded-full text-sm border">OR</div>
            </div>

            <Card className="relative hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-6 w-6" />
                  <CardTitle className="text-lg">Use API Key</CardTitle>
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

      {/* 当能获取到用户信息时，根据 current_plan 字段展示对应的内容 */}
      {!loading && user && user.user_id && (
        <>
          {user.current_plan !== null ? null : (
            // 免费用户（已登录但未订阅）：用订阅引导视图替换 Sign in，保持 Use API Key 不变
            <div className="grid md:grid-cols-2 gap-6 mb-8 relative">
              <h1 className="text-2xl font-bold mb-2">Missing OpenAI API Key</h1>
              <SubscriptionPrompt />

              {/* 移动端水平 OR 分隔符 */}
              <div className="md:hidden flex items-center justify-center">
                <div className="bg-background px-4 py-2 rounded-full text-sm border">OR</div>
              </div>

              <Card className="relative hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="h-6 w-6" />
                    <CardTitle className="text-lg">Use API Key</CardTitle>
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
          )}
        </>
      )}

      <UsageGuide />
    </div>
  )
}