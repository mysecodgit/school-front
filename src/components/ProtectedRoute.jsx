import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { userContext } from "../App";

const ProtectedRoute = ({ component: Component, render, allowedRoles, ...rest }) => {
    const user = useContext(userContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!user) return <Redirect to="/login" />;
                if (allowedRoles && allowedRoles.includes(user.role)) {
                    return Component ? <Component {...props} /> : render(props);
                } else {
                    return (
                        <div
                            style={{
                                padding: 10,
                                borderRadius: 4,
                                background: "#f8d7da",
                                color: "#721c24",
                                border: "1px solid transparent",
                                borderColor: "#f5c6cb",
                            }}
                        >
                            Sorry you are not authorized to view this content.
                        </div>
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
