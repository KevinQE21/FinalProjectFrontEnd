import { createContext } from "react";
import { firebaseAuth } from "../firebase";

const authContext = createContext();

function AuthProvider({ children }){

    function singUp(email, password){
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    return (
        <authContext.Provider value= "">
            {children}
        </authContext.Provider>
    );
};

export { authContext, AuthProvider };