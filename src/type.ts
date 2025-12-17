import type { ReactNode } from "react";

export interface LoginType {
    email: string,
    password: string
}

export interface SignupType {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface UserType{
    email: string,
    password: string,
    name: string
}

export interface ThemeContextType {
    darkMode: boolean,
    toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

