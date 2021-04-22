import firebase from "./firebase.service";
import "firebase/firestore";

const db = firebase.firestore();

export const getUserRecipes = async (userId: string) => {
  const results = await db.collection(userId).get();
  const recipes = results.docs.map(doc => ({id:doc.id, ...doc.data()}));
  return recipes;
};

export const getRecipeByID = async (userId: string, documentID: string) => {
  const results = await db.collection(userId).doc(documentID).get();
  const recipe = results.data()
  return recipe
};

export const deleteRecipe = async (userId:string, docId:string) => {
  db.collection(userId).doc(docId).delete()
}
