import { db } from "./firebase.service";
import "firebase/firestore";
import axios from "axios";
import cheerio from "cheerio";

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