import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Star } from "lucide-react"

export default function SubscriptionPrompt(props: {apiKeySetted?: boolean}) {
    const { apiKeySetted } = props;
    return (
        <Card className={`${apiKeySetted ? "hover:border-primary" : ""} transition-colors`}>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="h-6 w-6" />
                    Upgrade to Premium
                </CardTitle>
                <CardDescription>
                    Get access to all features without needing an API key. Plus, enjoy unlimited access to our companion Japanese
                    learning website.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                    <Button className="group flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
                        Subscribe Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    </Button>
                    <div className="text-sm text-muted-foreground text-center">
                        Learn more about {" "}
                        <br />
                        <a
                            href="https://japanese-memory-rsc.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-4 hover:text-muted-foreground"
                        >
                            Japanese learning website
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

