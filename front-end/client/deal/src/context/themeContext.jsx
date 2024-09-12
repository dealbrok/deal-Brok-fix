import { createContext, useState } from "react";

export const themeContext = createContext({
  currentTheme: "",
  setCurrentTheme: () => {},
  theme: {
    light: {
      bgColor: "",
      txtColor: "",
    },
    dark: {
      bgColor: "",
      txtColor: "",
    },
  },
});

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");
  return (
    <themeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        theme: {
          light: {
            bgColor: "bg-slate-200",
            txtColor: "text-black",
          },
          dark: {
            bgColor: "bg-base-200",
            txtColor: "text-white",
          },
        },
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
