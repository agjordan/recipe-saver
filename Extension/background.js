// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional'
/*global firebase, chrome*/

var firebaseConfig = {
  apiKey: "AIzaSyDl2DAzvxZztmZXR5tLNmF7ks9xuAYiCcA",
  authDomain: "recipe-saver-f431f.firebaseapp.com",
  projectId: "recipe-saver-f431f",
  storageBucket: "recipe-saver-f431f.appspot.com",
  messagingSenderId: "1002136588620",
  appId: "1:1002136588620:web:475c34249d86bdaadbffe9",
  measurementId: "G-9L51SZ9BWB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

let currentUser;

firebase.auth().onAuthStateChanged((user) => (currentUser = user));

// listen for a message back from content.js with a payload
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const jsonld = request.jsonld;
  //display print friendly recipe
  if (request.message === "printRecipe") {
    printRecipe(jsonld);

    // save recipe to firestore
  } else if (request.message === "saveRecipe") {
    console.log(jsonld)
    db.collection(currentUser.uid)
      .add({
        name: jsonld.name,
        url: jsonld.mainEntityOfPage,
        images: jsonld.image.flat(),
        ingredients: jsonld.recipeIngredient.flat(),
        instructions: jsonld.recipeInstructions.flat(),
        cuisine: jsonld.recipeCuisine,
        category: jsonld.recipeCategory,
        yield: jsonld.recipeYield,
        prepTime: jsonld.prepTime,
        cookTime: jsonld.cookTime,
        json: JSON.stringify(jsonld)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    alert("Recipe saved!");

    // view saved recipes
  } else if (request.message === "viewRecipes") {
    chrome.tabs.create({ url: `https://recipe-saver-f431f.web.app/` });
  } else if (request.message === "login") {
    const signIn = () => {
      firebase.auth().signInWithPopup(provider).catch(console.log());
    };

    signIn();

    if (currentUser) chrome.runtime.sendMessage({ message: "authenticated" });

  } else if (request.message === "checkAuth") {
    if (currentUser) {
      chrome.runtime.sendMessage({ message: "authenticated" })
    } else {
      chrome.runtime.sendMessage({ message: "unauthorized" })
    }

  } else if (request.message === "logOut") {
    console.log('logOut')
    firebase.auth().signOut()
  }
});

const printRecipe = (obj) => {
  // get image
  var writeableImage = formatImage(obj);
  //get ingredients
  var writeableIngredients = formatIngredients(obj);
  // get instructions
  var writeableInstructions = formatInstructions(obj);

  // write to new tab/blank page
  chrome.tabs.create({
    url: `javascript:document.write("<h1 style='display:inline'>${obj.name}</h1> <h3 style='display:inline'> - ${obj.author.name}</h3>${writeableImage}<br/>${writeableIngredients} ${writeableInstructions}")`,
  });
};

const formatImage = (obj) => {
  let image = obj.image;

  //if array of images, select first image otherwise should already be an image
  if (Array.isArray(image)) {
    image = image[0];
  }

  if (image.url) {
    image = image.url;
  }

  let imageText = `<img style='height:250px; width:250px; object-fit:contain; display:flex;' src=`;
  imageText += image;
  imageText += "></img>";

  return imageText;
};

const formatIngredients = (obj) => {
  var ingredients = obj.recipeIngredient;

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
};

const formatInstructions = (obj) => {
  var instructions = obj.recipeInstructions;

  //sometimes array is doubled up (but could be more?)
  while (Array.isArray(instructions[0])) {
    instructions = instructions[0];
  }

  //create html ordered list as a string in order to write to new page
  var instructionsText = "<ol> <h2>Instructions</h2>";
  for (var j in instructions) {
    //replace " with * to avoid issues with rendering HTML
    instructionsText += `<li  style='margin: 0 0 5px 0;'> ${instructions[
      j
    ].text.replace('"', '\\"')}</li>`;
  }
  instructionsText += "</ol>";

  return instructionsText;
};
