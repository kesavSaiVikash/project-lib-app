import { useState, useEffect } from "react";
import { DataService } from "../services/DataService";
import { AuthService } from "../services/AuthService";
import { ProjectEntry } from "../utils/model/Model";

export function useProjects(
  dataService: DataService,
  authService: AuthService
) {
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [deletionText, setDeletionText] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state management
  const [selectedProject, setSelectedProject] = useState<
    ProjectEntry | undefined
  >(undefined);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();

    if (dataService.isAuthorized()) {
      // fetchProjects();
      checkAdminStatus();
    }
  }, []);

  // Manage background scrolling when modal is open/closed
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isModalOpen]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true); // Start loader
      const fetchedProjects = await dataService.getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const checkAdminStatus = async () => {
    try {
      const adminStatus = await authService.isAdmin();
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      setIsLoading(true); // Start loader
      await dataService.deleteProject(projectId);
      await fetchProjects();
      setDeletionText(`Project with ID ${projectId} deleted.`);
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const openModal = (project: ProjectEntry) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(undefined);
    setModalOpen(false);
  };

  const openErrorModal = () => {
    setErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  return {
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
  };
}
