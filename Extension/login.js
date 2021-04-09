/*global chrome*/

document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({"message": "checkAuth"});

    const logIn = () => {
        chrome.runtime.sendMessage({"message": "login"});
    }

    document.getElementById("login").addEventListener("click", logIn)
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'authenticated') {
            console.log('authenticated message received')
            chrome.browserAction.setPopup({popup: "popup.html"})
        }
    }
)
