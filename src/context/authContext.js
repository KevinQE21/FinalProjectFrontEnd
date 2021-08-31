import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";

const authContext = createContext();

function useAuth(){
    return useContext(authContext);
}

function AuthProvider({ children }){
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        return firebaseAuth.onAuthStateChanged(user =>
            {
                setCurrentUser( user )
                setLoading(false);
            });        
    }, []);

    function signup(email, password){
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    function login(email, password){
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    const values = {
        signup,
        currentUser,
        login 
    }

    return (
        <authContext.Provider value={ values}>
            { !loading && children }
        </authContext.Provider>
    );
};

export { useAuth, AuthProvider };
