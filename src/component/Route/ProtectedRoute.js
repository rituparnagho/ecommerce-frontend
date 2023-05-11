import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Routes>
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Navigate replace to='/login' />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Navigate replace to='/login' />;
            }

            return <Component {...props} />;
          }}
        />
        </Routes>
      )}
    </>
  );
};

export default ProtectedRoute;