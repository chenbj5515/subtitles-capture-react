window.addEventListener('load', () => {
  // 发送消息给后台 worker，发起 Google 登录请求
  chrome.runtime.sendMessage({ type: "GOOGLE_SIGN_IN" }, (response) => {
    if (response.error) {
      console.error("请求错误：", response.error);
      document.body.innerHTML = "<h3>请求错误，请重试。</h3>";
    } else {
      const data = response.result;
      if (data.success && data.authUrl) {
        console.log("authUrl", data.authUrl)
        // 拿到 authUrl 后，重定向到 Google 授权页面
        window.location.href = data.authUrl;
      } else {
        console.error("Google 登录请求失败：", data);
        document.body.innerHTML = "<h3>登录请求失败，请重试。</h3>";
      }
    }
  });
}); 