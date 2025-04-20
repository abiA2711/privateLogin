// ProtectedRoute.js
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const authToken = localStorage.getItem('authToken');
    return authToken ? children : <Navigate to="/login" />;
}

export function RedirectIfLoggedIn({ children }) {
    const authToken = localStorage.getItem('authToken');
    return authToken ? <Navigate to="/dashboard" /> : children;
}
