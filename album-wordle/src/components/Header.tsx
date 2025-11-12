import {useState, useEffect} from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
}, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

    return (
        <div className="header">
            <h1>Album Wordle</h1>
            <button className="dark-mode-btn" onClick={toggleDarkMode}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        </div>
    );
}

export default Header;