import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import {cn} from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode,setIsDarkMode] = useState(true); // Default to dark mode
  
  useEffect(()=>{
    const storedTheme = localStorage.getItem("theme")
    if(storedTheme == "light"){
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark theme
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  },[])
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light")
      setIsDarkMode(false);
    } else {
       document.documentElement.classList.add("dark");
       localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  };

  return (
  <button onClick = {toggleTheme} className={cn(
    "fixed top-20 right-4 sm:top-24 sm:right-5 z-50 p-3 sm:p-2 rounded-full transition-all duration-300",
    "bg-background/80 backdrop-blur-md border border-white/20 shadow-lg",
    "hover:bg-background/90 hover:scale-110 active:scale-95",
    "focus:outline-none focus:ring-2 focus:ring-primary/50",
    "min-h-[48px] min-w-[48px] sm:min-h-[44px] sm:min-w-[44px]", // Better touch targets
    "flex items-center justify-center" // Center the icon
  )}>

    {isDarkMode?(
      <Sun className="h-6 w-6 sm:h-5 sm:w-5 text-yellow-400 drop-shadow-lg"/>
    ):(
  <Moon className="h-6 w-6 sm:h-5 sm:w-5 text-blue-600 drop-shadow-lg"/>
)}
</button>
);
};
  // const [isDarkMode, setIsDarkMode] = useState(() => localStorage.theme === "dark");

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.theme = "dark";
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.theme = "light";
  //   }
  // }, [isDarkMode]);

  // return (
  //   <button onClick={() => setIsDarkMode(!isDarkMode)}>
  //     {isDarkMode ? <Sun /> : <Moon />}
  //   </button>
  // );

