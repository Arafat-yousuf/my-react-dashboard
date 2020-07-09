import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import React , { createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const  PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }


  const Auth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
             setUser(user);
          }
        });
        
    },[])

    const signInWithPassword = (email,password) => {
        return firebase.auth().signInWithEmailAndPassword(email,password)
       .then(res => {
           setUser(res.user);
           window.history.back(); 
        })
        .catch(err=> setUser({error: err.message}))
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
       .then(res => {
           setUser(res.user);
           window.history.back(); 
        })
        .catch(err=> setUser({error: err.message}))
    }

    const signUp = (email, password, name) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            firebase.auth().currentUser.updateProfile({
                displayName: name
            }).then(() => {
              setUser(res.user);
              window.history.back(); 
            });
        })
        .catch(err=> setUser({error: err.message}))
    }

    const signOut = () => {
        return firebase.auth().signOut()
        .then(res => {setUser(null);
            window.location.pathname ='/';
        })
    }
    return{
        user,
        signInWithPassword,
        signInWithGoogle,
        signUp,
        signOut
    }
}

export default Auth;