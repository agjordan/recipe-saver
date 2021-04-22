/*global chrome*/

document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({"message": "checkAuth"});

    const logInWithGoogle = () => {
        chrome.runtime.sendMessage({"message": "logInWithGoogle"});
    }
    const logInWithEmail = (event) => {
        chrome.runtime.sendMessage({
            "message": "logInWithEmail",
            "email": event.target[0].value,
            "password": event.target[1].value,
        });
    }
    const register = () => {
        chrome.runtime.sendMessage({"message": "register"});
    }

    document.getElementById("login").addEventListener("click", logInWithGoogle)
    document.getElementById("loginForm").addEventListener("submit", logInWithEmail)
    document.getElementById("register").addEventListener("click", register)
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === 'authenticated') {
            chrome.browserAction.setPopup({popup: "popup.html"})
            window.close();
        }
    }
)
