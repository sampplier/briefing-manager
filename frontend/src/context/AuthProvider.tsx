import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

interface User {
    id: number;
    email: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode<User>(token);
                setUser(decoded);
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = async (email: string, senha: string) => {
        try {
            const res = await axios.post("http://localhost:5000/auth/login", { email, senha });
            localStorage.setItem("token", res.data.token);
            const decoded = jwtDecode<User>(res.data.token);
            setUser(decoded);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
