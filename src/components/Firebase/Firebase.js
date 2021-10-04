import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider  } from "firebase/auth";
import './Firebase.css';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASURENENT_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  
};
const signInWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, "cmduquer@gmail.com", "123456789")
  .then((userCredential) => {
    // Signed in 
    //const user = userCredential.user;
    console.log("logged in");
    //console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
};
const registerWithEmailAndPassword =  ( email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

};
const sendPasswordResetEmail = (email) => {
  try {
    //await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};
export {
  auth,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithGoogle,
  logout,
};
