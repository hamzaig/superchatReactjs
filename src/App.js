import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Channel from "./components/Channel";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyCVPDqgSK6lUxD5JsTWZ985-Wymb3i0kig",
  authDomain: "react-firechat-44d6b.firebaseapp.com",
  projectId: "react-firechat-44d6b",
  storageBucket: "react-firechat-44d6b.appspot.com",
  messagingSenderId: "618374429650",
  appId: "1:618374429650:web:37882b5e7c0f51e18fe60b",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {

  const [user, setUser] = useState(() => auth.currentUser);
  const [initilizing, setInitilizing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initilizing) {
        setInitilizing(false);
      }
    });
    return unsubscribe;
  }, []);


  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };


  if (initilizing) return "Loading...";

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      {
        user ? (
          <>
            <button className="btn btn-danger m-3" onClick={signOut}>Sign Out</button>
            <Channel user={user} db={db} />
          </>
        ) : (<button className="btn btn-success m-3" onClick={signInWithGoogle}>Sign In With Google</button>)
      }
    </div>
  );
}

export default App;
