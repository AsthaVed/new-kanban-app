import {createContext, useState, useContext} from "react";
import type { ThemeContextType, ThemeProviderProps } from "@/type";

// create context
const ThemeContext = createContext<ThemeContextType | null>(null);

// provider context
export const ThemeProvider = ({children}: ThemeProviderProps) => {

    const [darkMode, setDarkMode] = useState<boolean>(false);
    const toggleTheme = () => setDarkMode(prev => !prev);

    return(
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

//custom hook
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
}