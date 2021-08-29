import { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";

const authContext = createContext();

function useAuth(){
    return useContext(authContext);
}

function AuthProvider({ children }){
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true);

    function singup(email, password){
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        return firebaseAuth.onAuthStateChanged(user =>
            {
                setCurrentUser( user )
                setLoading(false);
            });        
    }, []);     

    return (
        <authContext.Provider value={{ singup, currentUser }}>
            { !loading && children }
        </authContext.Provider>
    );
};

export { useAuth, AuthProvider };