import React, { Suspense, useMemo } from "react";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router";

import { routeNames } from "./routeNames";
import { ProtectedRoute } from "./ProtectedRoutes";
import { AuthenticationRoute } from "./AuthenticationRoutes";
import { Navbar } from "../components/organisims/Navbar";

const Login = React.lazy(() =>
  import("../components/pages/Login").then((module) => ({
    default: module.Login,
  }))
);
const Dashboard = React.lazy(() =>
  import("../components/pages/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
const PageNotFound = React.lazy(() =>
  import("../components/pages/PageNotFound").then((module) => ({
    default: module.PageNotFound,
  }))
);

const Routes = () => {
  const router = useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<></>}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to={routeNames.dashboard} replace />
              </ProtectedRoute>
            }
          />

          <Route
            path={routeNames.login}
            element={
              <AuthenticationRoute>
                <Login />
              </AuthenticationRoute>
            }
          />

          <Route
            path={routeNames.dashboard}
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={routeNames.pagenotfound}
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Route>
      )
    );
  }, []);

  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export { Routes };
