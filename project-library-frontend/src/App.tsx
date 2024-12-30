import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/createProject/CreateProject";
import Login from "./pages/login/Login";

const authService = new AuthService();

const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName} authService={authService} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/login",
          element: (
            <Login authService={authService} setUserNameCb={setUserName} />
          ),
        },
        {
          path: "/logout",
          element: <h2>Logged out sucessfully!</h2>,
        },
        {
          path: "/",
          element: (
            <Projects dataService={dataService} authService={authService} />
          ),
        },
        {
          path: "/createProject",
          element: <CreateProject dataService={dataService} />,
        },
      ],
    },
  ]);

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
