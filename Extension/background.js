// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDl2DAzvxZztmZXR5tLNmF7ks9xuAYiCcA",
    authDomain: "recipe-saver-f431f.firebaseapp.com",
    projectId: "recipe-saver-f431f",
    storageBucket: "recipe-saver-f431f.appspot.com",
    messagingSenderId: "1002136588620",
    appId: "1:1002136588620:web:475c34249d86bdaadbffe9",
    measurementId: "G-9L51SZ9BWB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

// listen for a message back from content.js with a payload
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        jsonld = request.jsonld;

        //display print friendly recipe
        if (request.message === "printRecipe") {
            printRecipe(jsonld);

        // save recipe to firestore
        } else if (request.message === "saveRecipe") {
            db.collection("recipes").add({
                name: formatName(jsonld),
                json: jsonld,
                url: JSON.parse(jsonld).mainEntityOfPage
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

            alert("Recipe saved!")

        // view saved recipes
        } else if (request.message === "viewRecipes") {
            chrome.tabs.create({url:`https://recipe-saver-f431f.web.app/`});
        }
    }
);

function printRecipe(obj) {
    //get recipe name
    var writeableName = formatName(obj);
    //get author name
    var writeableAuthor = formatAuthor(obj);
    // get image
    var writeableImage = formatImage(obj);
    //get ingredients
    var writeableIngredients = formatIngredients(obj);
    // get instructions
    var writeableInstructions = formatInstructions(obj);

    // write to new tab/blank page
    chrome.tabs.create({url:`javascript:document.write("<h1 style='display:inline'>${writeableName}</h1> <h3 style='display:inline'> - ${writeableAuthor}</h3>${writeableImage}<br/>${writeableIngredients} ${writeableInstructions}")`});
}

function formatName(obj) {
    return JSON.parse(obj).name;
}

function formatAuthor(obj) {
    return JSON.parse(obj).author.name;
}

function formatImage(obj) {
    image = JSON.parse(obj).image;

    //if array of images, select first image otherwise should already be an image
    if (Array.isArray(image)) {
        image = image[0]
    }

    if (image.url) {
        image = image.url;
    }

    imageText = `<img style='height:250px; width:250px; object-fit:contain; display:flex;' src=`;
    imageText += image;
    imageText += "></img>";

    return imageText;
}

function formatIngredients(obj) {
    var ingredients = JSON.parse(obj).recipeIngredient;

    if (Array.isArray(ingredients[0])) {
        ingredients = ingredients[0];
    }

    //create html unordered list as a string in order to write to new page
    var ingredientsText = `<ul> <h2>Ingredients</h2>`;
    for (var i in ingredients) {
        ingredientsText += `<li> ${ingredients[i]} </li>`;
    }
    ingredientsText += "</ul>";

    return ingredientsText;
}

function formatInstructions(obj) {
    var instructions = JSON.parse(obj).recipeInstructions;

    //sometimes array is doubled up (but could be more?)
    while (Array.isArray(instructions[0])) {
        instructions = instructions[0];
    }

    //create html ordered list as a string in order to write to new page
    var instructionsText = "<ol> <h2>Instructions</h2>";
    for (var j in instructions) {
        //replace " with * to avoid issues with rendering HTML
        instructionsText += `<li  style='margin: 0 0 5px 0;'> ${instructions[j].text.replace("\"", "\\\"")}</li>`;
    }
    instructionsText += "</ol>";

    return instructionsText;
}