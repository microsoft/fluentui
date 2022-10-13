import { getEnv } from '../getEnv';

export function getProject(projectname: string | undefined = undefined): string {
  if (projectname) {
    return projectname;
  } else {
    return getEnv('API_PROJECT');
  }
}
