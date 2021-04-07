document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("printRecipe").addEventListener("click", printRecipe);
    document.getElementById("saveRecipe").addEventListener("click", saveRecipe);
    document.getElementById("viewRecipes").addEventListener("click", viewRecipes);
});


function printRecipe() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "printRecipeClick"});
    });
}

function saveRecipe() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "saveRecipeClick"});
    });
}

function viewRecipes() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {"message": "viewRecipesClick"});
    });
}