import { Navigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { useAuth } from "../../custom_hooks/useAuth";

type LoginProps = {
  authService: AuthService;
  setUserNameCb: (userName: string) => void;
};

export default function Login({ authService, setUserNameCb }: LoginProps) {
  const {
    errorMessage,
    loginSuccess,
    handleSubmit,
    userName,
    setUserName,
    password,
    setPassword,
  } = useAuth({
    authService,
    setUserNameCb,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 dark:from-indigo-700 dark:to-purple-800">
      {loginSuccess && <Navigate to="/" replace={true} />}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Please login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-center text-sm text-red-500 dark:text-red-400">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
