import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Force dark mode globally for a premium, single-identity experience
  const [isDark] = useState(true); 

  useEffect(() => {
    document.documentElement.classList.add('dark');
    // Ensure body background is always the surface dark color
    document.body.className = 'bg-surface-950 text-white';
  }, []);

  const toggleTheme = () => {
    console.warn("Theme toggling is disabled for a Premium-Only Dark experience.");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
