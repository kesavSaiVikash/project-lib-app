import { useState, SyntheticEvent } from "react";
import { DataService } from "../services/DataService";

type CustomEvent = {
  target: HTMLInputElement;
};

export function useCreateProject(dataService: DataService) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [actionResult, setActionResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState<string>("");
  const [gitUrl, setGitUrl] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (name && description && technologies) {
      const id = await dataService.createProject(
        name,
        description,
        technologies,
        photo,
        liveUrl,
        gitUrl
      );
      setActionResult(`Created project with id ${id}`);
      setName("");
      setDescription("");
      setTechnologies([]);
      setPhoto(undefined);
    } else {
      setActionResult("Please provide a name and a description!");
    }
    setIsLoading(false);
  };

  function setPhotoUrl(event: CustomEvent) {
    setIsLoading(true);
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
    setIsLoading(false);
  }

  return {
    name,
    description,
    photo,
    setPhotoUrl,
    handleSubmit,
    setName,
    setDescription,
    actionResult,
    isLoading,
    technologies,
    setTechnologies,
    liveUrl,
    setLiveUrl,
    gitUrl,
    setGitUrl,
  };
}
