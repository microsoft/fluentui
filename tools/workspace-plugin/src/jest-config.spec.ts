import { getJestProjectsAsync } from '@nx/jest';
import createJestConfig from '../../../jest.config';

jest.mock('@nx/jest', () => ({
  getJestProjectsAsync: jest.fn(),
}));

describe('root Jest configuration', () => {
  it('includes workspace-plugin alongside automatically discovered projects', async () => {
    jest.mocked(getJestProjectsAsync).mockResolvedValue(['<rootDir>/another-project/jest.config.ts']);

    expect((await createJestConfig()).projects).toEqual([
      '<rootDir>/another-project/jest.config.ts',
      '<rootDir>/tools/workspace-plugin/jest.config.ts',
    ]);
  });
});
