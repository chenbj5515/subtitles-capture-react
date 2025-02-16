chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GOOGLE_SIGN_IN") {
        fetch("https://japanese-memory-auth.chenbj55150220.workers.dev/auth/google/login", {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                sendResponse({ result: data })
            })
            .catch(error => {
                sendResponse({ error: error.toString() })
            })
        // 返回 true 表示将异步地调用 sendResponse
        return true
    }
})