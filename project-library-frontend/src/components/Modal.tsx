import { ProjectEntry } from "../utils/model/Model";
import genericImage from "../assets/generic-photo.png";

interface ModalProps {
  project: ProjectEntry;
  closeModal: () => void;
}

const Modal = ({ project, closeModal }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-11/12 max-w-5xl h-auto max-h-[90vh] overflow-y-auto md:h-auto md:max-h-screen">
        {/* Close Icon */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-full p-2 shadow-md transition duration-300"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Modal Image */}
          <img
            src={project.photoUrl || genericImage}
            alt={project.name}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover"
          />
          {/* Modal Content */}
          <div className="p-8 md:w-1/2 overflow-y-auto max-h-[calc(90vh-80px)]">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              {project.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              {project.description}
            </p>

            <div className="mt-6 space-y-2">
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

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300"
              >
                Live Demo
              </a>

              <a
                href={project.gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
              >
                View Code
              </a>
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-gray-600 hover:shadow-lg transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
