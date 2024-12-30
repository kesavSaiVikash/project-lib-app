import {
  SignInOutput,
  fetchAuthSession,
  signIn,
  getCurrentUser,
  AuthUser,
  signOut,
} from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { ProjectsAuthStack } from "../../../project-library/outputs.json";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = "ca-central-1";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: ProjectsAuthStack.ProjectLibraryUserPoolId,
      userPoolClientId: ProjectsAuthStack.ProjectLibraryUserPoolClientId,
      identityPoolId: ProjectsAuthStack.ProjectLibraryIdentityPoolId,
    },
  },
});

export class AuthService {
  private user: SignInOutput | AuthUser | undefined;
  public jwtToken: string | undefined;
  private temporaryCredentials: object | undefined;
  private userName: string = "";

  public isAuthorized() {
    if (this.user) {
      return true;
    }
    return false;
  }

  public async login(
    userName: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      // check if user is already logged in
      const user = await this.getCurrentUser();

      if (user) {
        this.user = user;
      } else {
        const signInOutput: SignInOutput = await signIn({
          username: userName,
          password: password,
          options: {
            authFlowType: "USER_PASSWORD_AUTH",
          },
        });

        this.user = signInOutput;
      }

      this.userName = userName;

      this.jwtToken = await this.getIdToken();

      console.log(this.jwtToken);

      return this.user;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * call only after login
   */

  public async getIdToken() {
    const authSession = await fetchAuthSession();
    return authSession.tokens?.idToken?.toString();
  }

  private async getCurrentUser() {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return undefined;
    }
  }

  public isAdmin = () => {
    if (this.user && this.jwtToken) {
      try {
        // Decode the JWT (split, Base64 decode, then parse)
        const payload = JSON.parse(atob(this.jwtToken.split(".")[1]));

        console.log(payload);

        // Check if the user belongs to 'admin' group
        const groups = payload["cognito:groups"];

        return groups && groups.includes("admins");
      } catch (error) {
        console.error("Error decoding JWT or checking admin:", error);

        return false; // Return false if an error occurs
      }
    }

    return false; // Return false if no JWT token is available
  };

  public async getTemporaryCredentials() {
    if (this.temporaryCredentials) {
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    return this.temporaryCredentials;
  }

  public getUserName() {
    return this.userName;
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${ProjectsAuthStack.ProjectLibraryUserPoolId}`;

    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: awsRegion,
        },
        identityPoolId: ProjectsAuthStack.ProjectLibraryIdentityPoolId,
        logins: {
          [cognitoIdentityPool]: this.jwtToken!,
        },
      }),
    });

    const credentials = await cognitoIdentity.config.credentials();

    console.log(this.jwtToken);

    console.log(credentials);

    return credentials;
  }

  /**
   * Logs out the current user.
   */
  public async logout() {
    try {
      await signOut();

      this.user = undefined;
      this.jwtToken = undefined;
      this.temporaryCredentials = undefined;
      this.userName = "";

      // Clear browser storage
      localStorage.clear();
      sessionStorage.clear();

      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}
