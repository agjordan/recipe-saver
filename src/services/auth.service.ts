import firebase from './firebase.service'
import 'firebase/auth'

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export const signOut = ():void => {
  auth.signOut()
}

export const signIn = ():void => {
  auth.signInWithPopup(provider)
  .catch(error => console.log)
};

export default auth 