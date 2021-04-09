// listen for click on button from popup
/*global chrome*/

chrome.runtime.onMessage.addListener(
    function(request) {
        //if the button is clicked get the JSON-LD and send it to background.js
        if (request.message === "printRecipeClick" || request.message === "saveRecipeClick") {

            let backgroundMessage;

            if (request.message === "printRecipeClick") {
                backgroundMessage = "printRecipe";
            } else if (request.message === "saveRecipeClick") {
                backgroundMessage = "saveRecipe";
            }

            if (document.querySelector('script[type=\"application/ld+json\"]')) {
                var jsonld = document.querySelector('script[type=\"application/ld+json\"]').innerHTML;
                chrome.runtime.sendMessage({"message": backgroundMessage, "jsonld": jsonld});
            } 
            else {
                alert("Page does not use JSON-LD format");
            }
            
        } else if (request.message === "viewRecipesClick" ) {
            chrome.runtime.sendMessage({"message": "viewRecipes"});
        }
    }
);