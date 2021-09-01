import { Component } from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "./authContext";

function PrivateRoute(){
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render = {props => {
                currentUser ? <Component {...props}/> : <Redirect to="/login" />
            }}
        />
    );
}

export default PrivateRoute;