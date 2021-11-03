import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC4pkUVoIBhcEsKa66MuQBpUgQFWrRH4o8",
  authDomain: "udemy-vue-firebase-sites-bd133.firebaseapp.com",
  projectId: "udemy-vue-firebase-sites-bd133",
  storageBucket: "udemy-vue-firebase-sites-bd133.appspot.com",
  messagingSenderId: "937802597741",
  appId: "1:937802597741:web:ed1733d5c0af0ee3e60664"
};

  // init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }