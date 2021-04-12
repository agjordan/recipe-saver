import firebase from './firebase.service'
import 'firebase/firestore'

const db = firebase.firestore()

export const getUserRecipes = async (userId: string) => {
    const results = await db.collection(userId).get()
    const recipes = await results.docs.map(doc => doc.data())
    return recipes
}