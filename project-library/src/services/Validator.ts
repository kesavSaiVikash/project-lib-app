import { ProjectEntry } from "./model/Model";

export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

export class JsonError extends Error {}

export function validateAsProjectEntry(arg: any) {
  if ((arg as ProjectEntry).name == undefined) {
    throw new MissingFieldError("name");
  }

  if ((arg as ProjectEntry).description == undefined) {
    throw new MissingFieldError("description");
  }

  if ((arg as ProjectEntry).technologies == undefined) {
    throw new MissingFieldError("technologies");
  }

  if ((arg as ProjectEntry).id == undefined) {
    throw new MissingFieldError("id");
  }
}
