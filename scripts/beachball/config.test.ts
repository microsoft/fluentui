import v8Config from './release-v8.config';
import vNextConfig from './release-vNext.config';
import { config as sharedConfig } from './shared.config';

describe(`beachball configs`, () => {
  it(`should generate shared config`, () => {
    expect(sharedConfig).toEqual({
      changehint: "Run 'yarn change' to generate a change file",
      disallowedChangeTypes: ['major'],
      generateChangelog: true,
      hooks: {
        precommit: expect.any(Function),
      },
      ignorePatterns: [
        '**/*.{shot,snap}',
        '**/*.{test,spec}.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        '**/.eslintrc.*',
        '**/__fixtures__/**',
        '**/__mocks__/**',
        '**/docs/**',
        '**/stories/**',
        '**/.storybook/**',
        '**/bundle-size/**',
        '**/common/isConformant.ts',
        '**/src/testing/**',
        '**/config/tests.js',
        '**/jest.config.js',
        '**/SPEC*.md',
        '**/tests/**',
      ],
      scope: ['!packages/fluentui/*'],
      tag: 'latest',
      changelog: {
        customRenderers: {
          renderEntry: expect.any(Function),
          renderHeader: expect.any(Function),
        },
      },
    });
  });

  it(`should generate v8 release config`, () => {
    expect(v8Config.scope).toEqual(
      expect.arrayContaining([
        '!packages/fluentui/*',
        '!apps/perf-test-react-components',
        '!apps/vr-tests-react-components',
      ]),
    );
    expect(v8Config.scope.some(scope => scope.startsWith('!packages/react-'))).toBe(true);
    expect(v8Config.changelog).toEqual(sharedConfig.changelog);
  });

  it(`should generate vNext release config`, () => {
    const excludedPackages = ['!packages/fluentui/*'];

    expect(vNextConfig.scope).toEqual(
      expect.arrayContaining([
        ...excludedPackages,
        'apps/perf-test-react-components',
        'apps/vr-tests-react-components',
      ]),
    );

    expect(vNextConfig.scope.some(scope => scope.startsWith('packages/react-'))).toBe(true);

    const includeScopes = vNextConfig.scope.filter(scope => !excludedPackages.includes(scope));

    expect(vNextConfig.changelog.customRenderers).toEqual(sharedConfig.changelog.customRenderers);
    expect(vNextConfig.changelog.groups).toEqual([
      {
        changelogPath: 'packages/react-components/react-components',
        masterPackageName: '@fluentui/react-components',
        include: includeScopes,
      },
    ]);
  });
});
