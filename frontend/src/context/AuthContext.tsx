import { createContext } from "react";

interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
