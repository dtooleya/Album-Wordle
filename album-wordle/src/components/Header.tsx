import { useState, useEffect, useRef } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const btnRef = useRef(null) as any;

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    console.log(stored);
    if (stored === 'dark') {
      document.documentElement.classList.add('dark-mode');
      setDarkMode(true);
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
    if (btnRef.current) {
      btnRef.current.blur();
    }
  };

  return (
    <div className="header">
      <h1>Album Wordle</h1>
      <button className="dark-mode-btn" onClick={toggleDarkMode} ref={btnRef}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
    </div>
  );
}

export default Header;