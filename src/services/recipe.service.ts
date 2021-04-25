import { db } from "./firebase.service";
import "firebase/firestore";

export const getUserRecipes = async (userId: string) => {
  const results = await db.collection(userId).get();
  const recipes = results.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return recipes;
};

export const getRecipeByID = async (userId: string, documentID: string) => {
  const results = await db.collection(userId).doc(documentID).get();
  const recipe = results.data();
  return recipe;
};

export const deleteRecipe = async (userId: string, docId: string) => {
  db.collection(userId).doc(docId).delete();
};

export const updateNotes = async (
  userId: string,
  docId: string,
  updateString: string
) => {
  db.collection(userId).doc(docId).update({ notes: updateString });
};

export const saveRecipeWithUrl = async (userId:string, url:string ) => {

  const jsonld:any = await fetch(`https://recipe-saver-server.herokuapp.com/?url=${url}`).then(response => response.json())
  console.log(jsonld)

  if (!jsonld) {
    alert('recipe not implemented with ld+json, try a different recipe. Sorry.')
    return
  }

  if (Array.isArray(jsonld.image)) jsonld.image = jsonld.image.flat()

  if (Array.isArray(jsonld.recipeIngredient)) jsonld.recipeIngredient = jsonld.recipeIngredient.flat();
  if (Array.isArray(jsonld.recipeInstructions)) jsonld.recipeInstructions = jsonld.recipeInstructions.flat();

  const stringToHash = (string:string): string => {
                
    var hash = 0;
      
    if (string.length === 0) return hash.toString();
      
    for (let i = 0; i < string.length; i++) {
        const char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
      
    return hash.toString();
  }

  const getImage = () => {
    if (Array.isArray(jsonld.image)) return jsonld.image[0]
    if (jsonld.image?.url) return jsonld.image.url
    return jsonld.image
  }

  const getInstructions = () => {
    if (Array.isArray(jsonld.recipeInstructions)) return jsonld.recipeInstructions.flat()
    return jsonld.recipeInstructions
  }

  const getIngredients = () => {
    if (Array.isArray(jsonld.recipeIngredient)) return jsonld.recipeIngredient.flat()
    return jsonld.recipeIngredient
  }

  console.log(jsonld.recipeIngredient)

  db.collection(userId)
  .doc(stringToHash(url))
  .set({
      name: jsonld.name,
      url: url,
      image: getImage(),
      ingredients: getIngredients(),
      instructions: getInstructions(),
      cuisine: jsonld.recipeCuisine || 'unknown',
      category: jsonld.recipeCategory || 'unknown',
      yield: jsonld.recipeYield || 'unknown',
      prepTime: jsonld.prepTime || 'unknown',
      cookTime: jsonld.cookTime || 'unknown',
      json: JSON.stringify(jsonld),
      notes: "You can leave notes about this recipe here :)"
    })
    .then(() => {
      alert("Recipe saved!");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}