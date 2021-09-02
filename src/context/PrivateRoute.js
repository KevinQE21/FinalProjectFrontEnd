import { Redirect, Route } from "react-router";
import { useAuth } from "./authContext";

function PrivateRoute({ component: Component, ...rest }){
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render = {props => (
                currentUser ? <Component {...props}/> : <Redirect to="/" />
            )}
        />
    );
}

export default PrivateRoute;