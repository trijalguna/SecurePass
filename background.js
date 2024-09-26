chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "logMessage") {
        console.log("Message from popup:", request.message);
        sendResponse({ status: "Message logged" });
    }
});