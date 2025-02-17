chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "EXTRACT_SUBTITLES") {

        // 发起请求
        (async () => {
            try {
                console.log('message.data.imageData:', message.data.imageData);
                const uint8Array = new Uint8Array(message.data.imageData);
                const blob = new Blob([uint8Array], { type: 'image/png' });
                const formData = new FormData();
                formData.append('image', blob, 'image.png');

                const response = await fetch('https://japanese-memory-auth.chenbj55150220.workers.dev/api/openai/extract-subtitles', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                // console.log('response:', response);
                const data = await response.json();

                console.log('data:', data);

                if (data.success) {
                    console.log("提取到的字幕:", data.subtitles);
                    sendResponse({ result: data.subtitles });
                } else {
                    console.error("接口调用失败:", data.error);
                    sendResponse({ error: data.error });
                }
            } catch (error) {
                console.error("请求出现异常:", error);
                sendResponse({ error: error.message });
            }
        })();

        return true; // 表示会异步发送响应
    }
});
