import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}