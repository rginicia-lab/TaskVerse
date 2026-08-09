import "./Topbar.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

function Topbar({ search, setSearch }) {

    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="topbar">

            <div className="topbar-actions">

                <div className="top-search">

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="theme-btn"
                >
                    {darkMode ? <FaSun /> : <FaMoon />}

                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

            </div>

        </div>
    );
}

export default Topbar;