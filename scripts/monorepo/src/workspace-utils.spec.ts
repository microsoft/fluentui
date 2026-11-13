import { join } from 'node:path';

import { workspaceRoot } from '@nx/devkit';

import { getWorkspaceProjects, getWorkspaceProjectsAliases } from './workspace-utils';

describe(`workspace-utils`, () => {
  describe(`#getWorkspaceProjects`, () => {
    it(`should return Map of all workspace valid/registered projects`, () => {
      const actual = getWorkspaceProjects();
      expect(actual.has('noop')).toEqual(false);

      expect(actual.has('react-text')).toBe(true);
      expect(actual.get('react-text')).toEqual(
        expect.objectContaining({
          $schema: expect.any(String),
          implicitDependencies: expect.any(Array),
          name: 'react-text',
          projectType: 'library',
          root: expect.any(String),
          sourceRoot: expect.any(String),
          tags: expect.any(Array),
        }),
      );
    });
  });

  describe(`#getWorkspaceProjectsAliases`, () => {
    const reactTextEntry = join(workspaceRoot, 'packages', 'react-components', 'react-text', 'library', 'src', 'index');

    it(`should create alias mapping`, () => {
      const actual = getWorkspaceProjectsAliases();

      expect(actual['@fluentui/noop']).toEqual(undefined);

      const keys = Object.keys(actual);
      expect(keys).toEqual(expect.arrayContaining([expect.stringMatching(/@fluentui\/[a-z-]+[a-z]$/)]));
      expect(actual['@fluentui/react-text']).toBe(reactTextEntry);
    });

    it(`should exclude specified projects`, () => {
      let actual = getWorkspaceProjectsAliases({ excludeProjects: ['react-components'] });

      expect(actual['@fluentui/react-components']).toEqual(undefined);

      actual = getWorkspaceProjectsAliases({ excludeProjects: ['@fluentui/react-components'] });

      expect(actual['@fluentui/react-components']).toEqual(undefined);
    });

    it.each([
      { type: 'webpack', expected: /@fluentui\/[a-z-]+\$$/, alias: '@fluentui/react-text$' },
      { type: 'jest', expected: /^\^@fluentui\/[a-z-]+\$$/, alias: '^@fluentui/react-text$' },
    ] as const)(`should create alias mapping for 'type=$type'`, ({ type, expected, alias }) => {
      const actual = getWorkspaceProjectsAliases({ type });

      const keys = Object.keys(actual);
      expect(keys).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
      expect(actual[alias]).toBe(reactTextEntry);
    });
  });
});
