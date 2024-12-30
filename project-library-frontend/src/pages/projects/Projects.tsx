import { useProjects } from "../../custom_hooks/useProjects";
import { DataService } from "../../services/DataService";
import { AuthService } from "../../services/AuthService";
import genericImage from "../../assets/generic-photo.png";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import ErrorModal from "../../components/ErrorModal";

interface ProjectsProps {
  dataService: DataService;
  authService: AuthService;
}

export default function Projects({ dataService, authService }: ProjectsProps) {
  const {
    projects,
    deletionText,
    isAdmin,
    isLoading,
    deleteProject,
    isModalOpen,
    selectedProject,
    closeModal,
    openModal,
    errorModalOpen,
    openErrorModal,
    closeErrorModal,
  } = useProjects(dataService, authService);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 min-h-screen py-16 px-8">
      {/* Loader */}
      {isLoading && <Loader />}

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <Modal project={selectedProject} closeModal={closeModal} />
      )}

      {/* Error Modal */}
      {errorModalOpen && (
        <ErrorModal
          deletionText={deletionText!}
          closeErrorModal={closeErrorModal}
        />
      )}

      {/* Header */}
      <header className="text-center mb-12 animate-fadeInScale">
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white tracking-tight">
          Welcome to Kesav's Projects_
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore my projects designed to solve real-world problems with <br />
          precision, creativity, and cost-efficient solutions.
        </p>
      </header>

      {/* Projects List */}
      <div className="space-y-12">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Project Image */}
            <div className="w-full md:w-1/3">
              <img
                src={project.photoUrl || genericImage}
                alt={project.name}
                className="w-full h-48 md:h-64 object-cover cursor-pointer"
                onClick={() => openModal(project)}
              />
            </div>

            {/* Project Info */}
            <div className="p-6 md:w-2/3">
              <h2
                className="text-3xl font-bold text-gray-800 dark:text-white hover:underline cursor-pointer"
                onClick={() => openModal(project)}
              >
                {project.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => {
                  return (
                    <span
                      key={tech}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href={`${project.liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:bg-green-600 transition duration-300"
                >
                  Live Demo
                </a>

                <a
                  href={project.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:bg-blue-600 transition duration-300"
                >
                  View Code
                </a>

                {isAdmin && (
                  <>
                    <button
                      onClick={async () => {
                        await deleteProject(project.id);
                        openErrorModal();
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:bg-red-600 transition duration-300"
                    >
                      Delete Project
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
