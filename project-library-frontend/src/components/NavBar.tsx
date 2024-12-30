import { NavLink } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { SyntheticEvent, useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import appLogo from "../assets/app-logo.png";

type NavBarProps = {
  userName: string | undefined;
  authService: AuthService;
};

export default function NavBar({ userName, authService }: NavBarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await authService.logout();
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 text-2xl font-bold text-blue-600">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={appLogo} alt="App Logo" className="w-8 h-8" />
            <span>ProjectsLibrary_</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "font-semibold underline" : ""
              }`
            }
          >
            My Projects
          </NavLink>

          {authService.isAdmin() && (
            <NavLink
              to="/createProject"
              className={({ isActive }) =>
                `text-gray-600 hover:text-blue-600 ${
                  isActive ? "font-semibold underline" : ""
                }`
              }
            >
              Create Project
            </NavLink>
          )}

          {userName ? (
            <a
              onClick={() => authService.logout()}
              className="text-gray-600 hover:text-blue-600"
            >
              Logout
            </a>
          ) : (
            <NavLink to="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </NavLink>
          )}
        </div>

        {/* Dark Mode Toggle (Moon/Sun) */}
        <DarkModeToggle />

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (toggle visibility based on state) */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <NavLink
            to="/"
            className="text-gray-600 hover:text-blue-600 font-semibold"
          >
            My Projects
          </NavLink>

          {authService.isAdmin() && (
            <NavLink
              to="/createProject"
              className="text-gray-600 hover:text-blue-600 font-semibold"
            >
              Create Project
            </NavLink>
          )}

          <div>
            {userName ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-600"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
