import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import {
  ProjectsApiStack,
  ProjectsDataStack,
} from "../../../project-library/outputs.json";
import { ProjectEntry } from "../utils/model/Model";

const projectsUrl = ProjectsApiStack.ProjectsApiEndpoint9E6B1F5A + "projects";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;
  private awsRegion = "ca-central-1";

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async getProjects(): Promise<ProjectEntry[]> {
    const getProjectsResult = await fetch(projectsUrl, {
      method: "GET",
      // headers: {
      //   Authorization: this.authService.jwtToken!,
      // },
    });

    const getProjectsResultJson = await getProjectsResult.json();

    return getProjectsResultJson;
  }

  public async deleteProject(projectId: string): Promise<ProjectEntry[]> {
    const deleteProjectsResult = await fetch(projectsUrl, {
      method: "DELETE",
      headers: {
        Authorization: this.authService.jwtToken!,
      },
      body: JSON.stringify({ id: projectId }),
    });

    const deleteProjectsResultJson = await deleteProjectsResult.json();

    return deleteProjectsResultJson;
  }

  public async createProject(
    name: string,
    description: string,
    technologies: string[],
    photo?: File,
    liveUrl?: string,
    gitUrl?: string
  ) {
    const project = {} as any;
    project.name = name;
    project.description = description;
    project.technologies = technologies;
    project.liveUrl = liveUrl;
    project.gitUrl = gitUrl;

    if (photo) {
      const uploadUrl = await this.uploadPublicFile(photo);
      project.photoUrl = uploadUrl;
    }

    const postResult = await fetch(projectsUrl, {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        Authorization: this.authService.jwtToken!,
      },
    });

    const postResultJSON = await postResult.json();

    return postResultJSON.id;
  }

  private async uploadPublicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials();

    console.log("credentials: " + JSON.stringify(credentials));

    if (!this.s3Client) {
      this.s3Client = new S3Client({
        credentials: credentials as any,
        region: this.awsRegion,
      });
    }

    const command = new PutObjectCommand({
      Bucket: ProjectsDataStack.ProjectLibraryBucketName,
      Key: file.name,
      ACL: "public-read",
      Body: file,
    });

    await this.s3Client.send(command);

    return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
  }

  public isAuthorized() {
    return this.authService.isAuthorized();
  }
}
