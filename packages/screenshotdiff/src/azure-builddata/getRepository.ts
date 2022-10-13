import { getEnv } from '../getEnv';

export function getRepository(repositoryName: string | undefined = undefined): string {
  if (repositoryName) {
    return repositoryName;
  } else {
    return getEnv('API_REPOSITORY');
  }
}
