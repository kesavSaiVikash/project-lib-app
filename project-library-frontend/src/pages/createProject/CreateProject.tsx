import { DataService } from "../../services/DataService";
import { useCreateProject } from "../../custom_hooks/useCreateProject";
import { NavLink } from "react-router-dom";
import Loader from "../../components/Loader";

type CreateProjectProps = {
  dataService: DataService;
};

export default function CreateProject({ dataService }: CreateProjectProps) {
  const {
    name,
    photo,
    description,
    technologies,
    handleSubmit,
    setName,
    setDescription,
    setTechnologies,
    setPhotoUrl,
    actionResult,
    isLoading,
    liveUrl,
    setLiveUrl,
    gitUrl,
    setGitUrl,
  } = useCreateProject(dataService);

  if (!dataService.isAuthorized()) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 dark:from-purple-800 dark:to-indigo-900">
        <h2 className="text-3xl font-extrabold text-white mb-6">
          Welcome to the Create Project page!
        </h2>
        <NavLink
          to="/login"
          className="bg-white text-purple-600 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-purple-100 transition duration-300 dark:bg-gray-800 dark:text-purple-300 dark:hover:bg-purple-700"
        >
          Please Login
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 bg-gray-50 dark:bg-gray-900">
      {isLoading && <Loader />}

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Welcome to the Create Project page!
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        {/* Project Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter project name"
          />
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter project description"
          />
        </div>

        {/* Project Technologies */}
        <div>
          <label
            htmlFor="technologies"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Technologies (comma-separated):
          </label>
          <input
            id="technologies"
            type="text"
            value={technologies.join(", ")}
            onChange={(e) =>
              setTechnologies(
                e.target.value.split(",").map((tech) => tech.trim())
              )
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., React, Node.js, AWS"
          />
        </div>

        <div>
          <label
            htmlFor="liveUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Live Url:
          </label>
          <input
            id="liveUrl"
            type="string"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., www.liveUrl.com"
          />
        </div>

        <div>
          <label
            htmlFor="gitUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Git Url:
          </label>
          <input
            id="gitUrl"
            type="string"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., www.gitUrl.com"
          />
        </div>

        {/* Project Photo */}
        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Photo:
          </label>
          <input
            id="photo"
            type="file"
            onChange={(e) => setPhotoUrl(e)}
            className="mt-1 block w-full text-sm text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-600 dark:file:text-blue-200 dark:hover:file:bg-blue-700"
          />
        </div>

        {/* Photo Preview */}
        {photo && (
          <div className="mt-4">
            <img
              alt="Project Preview"
              src={URL.createObjectURL(photo)}
              className="max-w-full rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Create Project
        </button>
      </form>

      {/* Action Result */}
      {actionResult && (
        <div className="mt-6 text-center">
          <h3 className="text-lg text-green-500">{actionResult}</h3>
        </div>
      )}
    </div>
  );
}
