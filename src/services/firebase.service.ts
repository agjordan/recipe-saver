import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDl2DAzvxZztmZXR5tLNmF7ks9xuAYiCcA",
    authDomain: "recipe-saver-f431f.firebaseapp.com",
    projectId: "recipe-saver-f431f",
    storageBucket: "recipe-saver-f431f.appspot.com",
    messagingSenderId: "1002136588620",
    appId: "1:1002136588620:web:475c34249d86bdaadbffe9",
    measurementId: "G-9L51SZ9BWB"
};

firebase.initializeApp(firebaseConfig);

export const firestoreDB = firebase.firestore();
export const firesbaseAuth = firebase.auth();
export default firebase
