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

    function resetPassword(email){
        return firebaseAuth.sendPasswordResetEmail(email);
    }

    function logout(){
        return firebaseAuth.signOut();
    }
    
    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    const values = {
        signup,
        currentUser,
        login,
        resetPassword,
        logout,
        updateEmail,
        updatePassword, 
    }

    return (
        <authContext.Provider value={ values}>
            { !loading && children }
        </authContext.Provider>
    );
};

export { useAuth, AuthProvider };
