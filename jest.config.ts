import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: [
    ...(await getJestProjectsAsync()),
    // Nx cannot infer this project's custom Node-based Jest command.
    '<rootDir>/tools/workspace-plugin/jest.config.ts',
  ],
});
