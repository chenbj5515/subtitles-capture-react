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
  const [hasStoredApiKey, setHasStoredApiKey] = useState(false)
  const [storedApiKey, setStoredApiKey] = useState("")  // 新增状态来存储 API key

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

  // 修改检查 chrome storage 的 useEffect
  useEffect(() => {
    chrome.storage.local.get(['openai_api_key'], (result) => {
      console.log(result, "result================")
      setHasStoredApiKey(!!result.openai_api_key)
      setStoredApiKey(result.openai_api_key || "") // 保存 API key 的值
    })
  }, [])

  // 点击"订阅引导"时，打开新的 tab 访问订阅引导页（替换下面的 URL）
  // const handleSubscribeGuide = () => {
  //   window.open("https://your-subscription-guide-url.com", "_blank")
  // }

  // TODO: 订阅引导页
  // TODO: 无账号时自动注册？
  // TODO: 订阅用户的 API Key 管理
  // content和background通信，在background发起服务器API的请求，在服务器发起对OPENAI API的请求。
  // 看起来很复杂但必须这样做，因为跨域配置只允许了插件后台的域，而content的域是和当前所在网页有关的，不能和服务器直接通信。
  // 因此必须和background通信后让background发起对服务器的请求。还有因为background也是可以通过开发者工具看到请求的，而付费用户是用的我的API KEY，所以显然也不能在这里发送OPENAI的请求
  // 所以background这里只能发送对我的API的请求，我的API那里发送对OPENAI的请求，这样才能保证API KEY不被泄露。
  // 不过这个架构下有个需要注意的点是图片的格式如何正确地传递，首先要保证传递到background时信息不会丢失，这需要先把blob转成数组传递才能保证不丢失信息，然后在background里把数组转成formData后传给后端。这样似乎才是传递图片信息的最佳实践。
  // TODO: 用户提供的API Key管理
  // 这个情况我想就直接明文存储和通信了，因为本来就是用户提供的，可以被开发者工具看到也问题不大，用户的设备的安全性让用户自己负责就可以了。

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
      {!loading && !user && !hasStoredApiKey && (
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
                <ApiKeyForm initialApiKey={storedApiKey} onSaved={() => window.location.reload()} />
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
                  <ApiKeyForm initialApiKey={storedApiKey} onSaved={() => window.location.reload()} />
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}

      {/* 没有用户但有存储的 API key 时的视图 */}
      {!loading && !user && hasStoredApiKey && (
        <>
          <div className="mb-6 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="w-[240px] text-white hover:text-white bg-black hover:bg-black/90"
              onClick={() => {
                window.location.href = "https://japanese-memory-auth.chenbj55150220.workers.dev/auth/github"
              }}
            >
              Sign in
            </Button>
          </div>

          <UsageGuide />

          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-6 w-6" />
                <CardTitle className="text-lg">Use API Key</CardTitle>
              </div>
              <CardDescription>
                You have already set up your OpenAI API key
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiKeyForm initialApiKey={storedApiKey} onSaved={() => window.location.reload()} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}