import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { AuthContext } from "./context/AuthContext";
import BriefingList from "./pages/BriefingList";
import BriefingForm from "./pages/BriefingForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Topbar from "./components/TopBar";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    return auth?.user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (   
    <AuthProvider>
        <BrowserRouter>
            <Topbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><BriefingList /></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><BriefingForm /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><BriefingForm /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default AppRoutes;