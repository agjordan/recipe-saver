// listen for click on button from popup
/*global chrome*/

chrome.runtime.onMessage.addListener(
    function(request) {
        //if the button is clicked get the JSON-LD and send it to background.js
        if (request.message === "printRecipeClick" || request.message === "saveRecipeClick") {

            let backgroundMessage;
            let additionalInfo = {};

            if (request.message === "printRecipeClick") {
                backgroundMessage = "printRecipe";
            } else if (request.message === "saveRecipeClick") {
                backgroundMessage = "saveRecipe";
                additionalInfo = {url: window.location.href}
                
            }

            if (document.querySelector('script[type="application/ld+json"]')) {
                const jsonldQuery = document.querySelectorAll('script[type="application/ld+json"]');
                const jsonArray = Array.from(jsonldQuery)
                const result = jsonArray.filter(json => JSON.parse(json.innerHTML)['@type'] === 'Recipe')
                const jsonld = result.length > 0 ? result[0].innerHTML : null;
                chrome.runtime.sendMessage({"message": backgroundMessage, "jsonld": JSON.parse(jsonld), "additionalInfo": additionalInfo});
            } 
            else {
                alert("Page does not use JSON-LD format");
            }
            
        } else if (request.message === "viewRecipesClick" ) {
            chrome.runtime.sendMessage({"message": "viewRecipes"});
        }
    }
);