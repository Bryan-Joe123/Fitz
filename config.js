import firebase from 'firebase'
require('@firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBRWsEi66XuyySbG43OvL3WTemYoK2-fI",
    authDomain: "fitz-36bd3.firebaseapp.com",
    projectId: "fitz-36bd3",
    storageBucket: "fitz-36bd3.appspot.com",
    messagingSenderId: "1057648224663",
    appId: "1:1057648224663:web:32b567886667075bb23cd2"
};
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
  
export default firebase.firestore();
