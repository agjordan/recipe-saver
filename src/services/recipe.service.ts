import firebase from './firebase.service'
import 'firebase/firestore'
import Recipes from '../components/Recipes'

const db = firebase.firestore()

export const getUserRecipes = async (userId: string) => {
    const results = await db.collection(userId).get()
    const recipes = results.docs.map(doc => doc.data())
    console.log(recipes)
    return recipes
}