import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

// Configuration & State
import { serverEndpoint } from "./config/config";
import { SET_USER } from "./redux/user/actions";
import ProtectedRoute from "./rbac/ProtectedRoute";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages: Home & Auth
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Pages: Core Features
import LinksDashboard from "./pages/links/LinksDashboard";
import AnalyticsDashboard from "./pages/links/AnalyticsDashboard";
import ManagePayments from "./pages/payments/ManagePayments";
import ManageUsers from "./pages/users/ManageUsers";

// Pages: Common & Status
import NotFound from "./pages/common/NotFound";
import Unauthorized from "./pages/common/Unauthorized";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  const isUserLoggedIn = useCallback(async () => {
    try {
      const response = await axios.post(`${serverEndpoint}/auth/is-user-logged-in`, {}, {
        withCredentials: true
      });
      dispatch({
        type: SET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing & Public Routes */}
      <Route
        path="/"
        element={
          userDetails ? (
            <DashboardLayout>
              <Navigate to="/dashboard" />
            </DashboardLayout>
          ) : (
            <PublicLayout>
              <Home />
            </PublicLayout>
          )
        }
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <PublicLayout>
              <Login />
            </PublicLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <PublicLayout>
              <Register />
            </PublicLayout>
          )
        }
      />
      <Route
        path="/forget-password"
        element={
          <PublicLayout>
            <ForgetPassword />
          </PublicLayout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicLayout>
            <ResetPassword />
          </PublicLayout>
        }
      />
      <Route
        path="/logout"
        element={userDetails ? <Logout /> : <Navigate to="/login" />}
      />

      {/* Authenticated Dashboard & Feature Routes */}
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <DashboardLayout>
              <LinksDashboard />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/analytics/:id"
        element={
          userDetails ? (
            <DashboardLayout>
              <AnalyticsDashboard />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manage-payments"
        element={
          userDetails ? (
            <DashboardLayout>
              <ManagePayments />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/users"
        element={
          userDetails ? (
            <ProtectedRoute roles={["admin"]}>
              <DashboardLayout>
                <ManageUsers />
              </DashboardLayout>
            </ProtectedRoute>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Common / Status Routes */}
      <Route
        path="/unauthorized-access"
        element={
          userDetails ? (
            <DashboardLayout>
              <Unauthorized />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/error"
        element={
          userDetails ? (
            <DashboardLayout>
              <NotFound />
            </DashboardLayout>
          ) : (
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          )
        }
      />
      <Route
        path="*"
        element={
          userDetails ? (
            <DashboardLayout>
              <NotFound />
            </DashboardLayout>
          ) : (
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          )
        }
      />
    </Routes>
  );
}

export default App;
