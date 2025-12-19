import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "user">;
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    console.log(" Access denied - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Access Denied</h1>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  console.log(" Access granted to protected route");
  return <>{children}</>;
};
