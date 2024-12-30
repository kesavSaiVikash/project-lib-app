import { SyntheticEvent, useState } from "react";
import { AuthService } from "../services/AuthService";

type LoginProps = {
  authService: AuthService;
  setUserNameCb: (userName: string) => void;
};

export const useAuth = ({ authService, setUserNameCb }: LoginProps) => {
  const [userName, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (userName && password) {
      const loginResponse = await authService.login(userName, password);

      const userName2 = authService.getUserName();

      if (userName2) {
        setUserNameCb(userName2);
      }
      if (loginResponse) {
        setLoginSuccess(true);
      } else {
        setErrorMessage("invalid credentials");
      }
    } else {
      setErrorMessage("UserName and password required!");
    }
  };

  return {
    errorMessage,
    loginSuccess,
    handleSubmit,
    userName,
    setUserName,
    password,
    setPassword,
  };
};
