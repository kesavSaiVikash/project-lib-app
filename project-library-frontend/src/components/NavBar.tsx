import { NavLink } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { SyntheticEvent, useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import appLogo from "../assets/app-logo.png";
import codeIcon from "../assets/code-icon.png";
import architectureDiagram from "../assets/project-lib-app-architecure.png";

type NavBarProps = {
  userName: string | undefined;
  authService: AuthService;
};

export default function NavBar({ userName, authService }: NavBarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await authService.logout();
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

        <div className="flex items-center space-x-6 ">
          {/* Code Icon */}
          <button
            onClick={handleOpenModal}
            className="flex items-center space-x-2 text-gray-600 bg-white hover:text-blue-600 transition duration-300"
          >
            <img
              src={codeIcon}
              alt="Code Icon"
              className="h-6 w-6" // Adjust icon size
            />
            <span className="hidden sm:block text-sm font-semibold">
              View AWS Architecture
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>

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

      {/* Modal for AWS Architecture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-6 space-y-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                AWS Architecture Overview of ProjectsLibrary_
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-2xl text-gray-600 hover:text-gray-800"
              >
                &times;
              </button>
            </div>

            {/* Architecture Diagram */}
            <div className="flex justify-center mb-4">
              <img
                src={architectureDiagram}
                alt="AWS Architecture Diagram"
                className="w-full max-w-[600px] rounded-md shadow-md"
              />
            </div>

            {/* Explanation with Scroll */}
            <div className="text-lg text-gray-500 max-h-96 overflow-y-auto">
              <p>
                The Project-Library App uses a cutting-edge, serverless
                architecture built on AWS to provide a seamless experience for
                managing and showcasing projects. Below is an overview of the
                core components and their roles:
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-6">
                <li>
                  <strong>AWS Lambda:</strong>
                  <p>
                    The backbone of the backend logic, AWS Lambda executes
                    serverless functions to handle operations like project
                    creation, updates, and deletions. It ensures the system is
                    highly scalable, with no need for manual server management.
                  </p>
                </li>
                <li>
                  <strong>API Gateway:</strong>
                  <p>
                    API Gateway routes client HTTP requests to the corresponding
                    Lambda functions, acting as the middleware between the
                    frontend and backend. It ensures secure and efficient
                    communication.
                  </p>
                </li>
                <li>
                  <strong>AWS S3 (Simple Storage Service):</strong>
                  <p>
                    S3 stores project assets like documentation, images, and
                    other files securely. It ensures fast access to project data
                    and automatically manages permissions for uploaded content.
                  </p>
                </li>
                <li>
                  <strong>Amazon DynamoDB:</strong>
                  <p>
                    DynamoDB serves as the serverless NoSQL database, storing
                    project metadata, user associations, and version histories.
                    It provides low-latency, highly available data storage,
                    enabling real-time project management.
                  </p>
                </li>
                <li>
                  <strong>Amazon Cognito:</strong>
                  <p>
                    Cognito manages user authentication and authorization. It
                    ensures secure access to the application based on roles and
                    permissions, enabling users to interact with the app
                    securely.
                  </p>
                </li>
                <li>
                  <strong>Pre-signed URLs:</strong>
                  <p>
                    To optimize file uploads and improve security, pre-signed
                    URLs are generated by Lambda functions. These URLs allow
                    users to upload files directly to S3 without passing through
                    the server, ensuring efficient and secure uploads.
                  </p>
                </li>
                <li>
                  <strong>AWS IAM (Identity and Access Management):</strong>
                  <p>
                    IAM manages resource-level permissions, ensuring that only
                    authorized actions can be performed on AWS services like S3,
                    Lambda, and DynamoDB. This guarantees the application
                    remains secure while allowing flexibility in resource
                    access.
                  </p>
                </li>
                <li>
                  <strong>Scalability & Security:</strong>
                  <p>
                    By utilizing serverless technologies, pre-signed URLs, and
                    IAM, the architecture is both scalable and secure. AWS
                    automatically handles scaling and provides secure mechanisms
                    for managing file uploads and data access.
                  </p>
                </li>
                <li>
                  <strong>Cost-Effectiveness:</strong>
                  <p>
                    The pay-as-you-go pricing model ensures that the app only
                    incurs costs for the resources it consumes. This helps to
                    minimize unnecessary overhead and optimize costs while still
                    benefiting from a robust infrastructure.
                  </p>
                </li>
              </ul>
              <p className="mt-4">
                This architecture is designed to offer a secure, scalable, and
                efficient solution for managing project libraries while fully
                leveraging AWS serverless technologies.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
