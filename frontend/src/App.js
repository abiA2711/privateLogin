import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';  // Login page component
import SignupPage from './SignupPage'; // Signup page component
import Dashboard from './dashboard'; // Dashboard component
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRoute, RedirectIfLoggedIn } from './protectedRoute'; // Import guards

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect to dashboard if already logged in */}
                <Route path="/" element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
                <Route path="/login" element={<RedirectIfLoggedIn><LoginPage /></RedirectIfLoggedIn>} />
                <Route path="/signup" element={<RedirectIfLoggedIn><SignupPage /></RedirectIfLoggedIn>} />

                {/* Protected dashboard route */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Redirect to login for unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
