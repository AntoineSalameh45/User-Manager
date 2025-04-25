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
import { SharedLayout } from "../Layout/SharedLayout";

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
const CreateUser = React.lazy(() =>
  import("../components/pages/NewUser").then((module) => ({
    default: module.NewUser,
  }))
);
const EditUser = React.lazy(() =>
  import("../components/pages/Edit").then((module) => ({
    default: module.EditUserPage,
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
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path={routeNames.dashboard} element={<Dashboard />} />
            <Route path={routeNames.newuser} element={<CreateUser />} />
            <Route path={routeNames.edituser} element={<EditUser />} />
            <Route path={routeNames.pagenotfound} element={<PageNotFound />} />
          </Route>
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
