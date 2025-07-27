// Kirim data user agent ke HookRelay
fetch("https://api.hookrelay.dev/hooks/jy615olz9wqvh3319qgr84em/06e4b60ce69806b3064a06a9", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        time: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform
    })
});
