/*global chrome*/

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("printRecipe").addEventListener("click", printRecipe);
    document.getElementById("saveRecipe").addEventListener("click", saveRecipe);
    document.getElementById("viewRecipes").addEventListener("click", viewRecipes);
    document.getElementById("LogOut").addEventListener("click", LogOut);

    chrome.runtime.sendMessage({ message: "checkAuth" });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === 'unauthorized') chrome.browserAction.setPopup({popup: "login.html"})
    });

});


const printRecipe = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "printRecipeClick"});
    });
}

const saveRecipe = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "saveRecipeClick"});
    });
}

const viewRecipes = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "viewRecipesClick"});
    });
}

const LogOut = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({"message": "logOut"});
    });
}