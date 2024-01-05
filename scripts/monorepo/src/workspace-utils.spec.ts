import { workspaceRoot } from '@nx/devkit';

import { getWorkspaceProjects, getWorkspaceProjectsAliases } from './workspace-utils';

describe(`workspace-utils`, () => {
  describe(`#getWorkspaceProjects`, () => {
    it(`should return Map of all workspace valid/registered projects`, () => {
      const actual = getWorkspaceProjects();
      expect(actual.has('@fluentui/noop')).toEqual(false);

      expect(actual.has('@fluentui/react-text')).toBe(true);
      expect(actual.get('@fluentui/react-text')).toEqual(
        expect.objectContaining({
          $schema: expect.any(String),
          implicitDependencies: expect.any(Array),
          name: '@fluentui/react-text',
          projectType: 'library',
          root: expect.any(String),
          sourceRoot: expect.any(String),
          tags: expect.any(Array),
        }),
      );
    });
  });

  describe(`#getWorkspaceProjectsAliases`, () => {
    const projectSourcePathRegex = new RegExp(workspaceRoot + '[a-z_/-]*/src/index$');

    it(`should create alias mapping`, () => {
      const actual = getWorkspaceProjectsAliases();

      expect(actual['@fluentui/noop']).toEqual(undefined);

      const keys = Object.keys(actual);
      const values = Object.values(actual);
      expect(keys).toEqual(expect.arrayContaining([expect.stringMatching(/@fluentui\/[a-z-]+[a-z]$/)]));
      expect(values).toEqual(expect.arrayContaining([expect.stringMatching(projectSourcePathRegex)]));
    });

    it(`should exclude specified projects`, () => {
      const actual = getWorkspaceProjectsAliases({ excludeProjects: ['@fluentui/react-components'] });

      expect(actual['@fluentui/react-components']).toEqual(undefined);
    });

    it.each([
      { type: 'webpack', expected: /@fluentui\/[a-z-]+\$$/ },
      { type: 'jest', expected: /^\^@fluentui\/[a-z-]+\$$/ },
    ] as const)(`should create alias mapping for 'type=$type'`, ({ type, expected }) => {
      const actual = getWorkspaceProjectsAliases({ type });

      const keys = Object.keys(actual);
      const values = Object.values(actual);
      expect(keys).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
      expect(values).toEqual(expect.arrayContaining([expect.stringMatching(projectSourcePathRegex)]));
    });
  });
});
