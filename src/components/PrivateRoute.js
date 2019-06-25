import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// It has the same API as <Route />.
// It renders a < Route /> and passes all the props through to it.
// It checks if the user is authenticated, if they are, it renders the “component” prop.If not, it redirects the user to / login.
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('token')) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
