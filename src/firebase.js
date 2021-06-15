import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDrhd7FuNCxlXWgWXheNxuyScFQUU2zstQ",
    authDomain: "friendszone-d5e02.firebaseapp.com",
    projectId: "friendszone-d5e02",
    storageBucket: "friendszone-d5e02.appspot.com",
    messagingSenderId: "418917790388",
    appId: "1:418917790388:web:9ed6c09aea388361721de1"
})

export const auth = app.auth()
export default app