import firebase from './firebase.service'
import 'firebase/auth'

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export const signOut = ():void => {
  auth.signOut()
}

export const signInWithGoogle = ():void => {
  auth.signInWithPopup(provider)
  .catch(error => console.log)
};

export const signInWithEmail = (email:string, password:string):void => {
  auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
}

export const registerNewUser = (email: string, password: string) => {
  auth.createUserWithEmailAndPassword(email, password).catch(error => alert(error))
}

export default auth 