import toolsConfig from './release-tools.config';
import v8Config from './release-v8.config';
import vNextConfig from './release-vNext.config';
import webComponentsConfig from './release-web-components.config';
import { config as sharedConfig } from './shared.config';

describe(`beachball configs`, () => {
  const excludedPackagesFromReleaseProcess = ['!packages/fluentui/*'];

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
        '**/*.{test,spec,cy}.{ts,tsx}',
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
        '**/src/e2e/**',
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
        ...excludedPackagesFromReleaseProcess,
        'packages/azure-themes',
        'packages/cra-template',
        'packages/date-time-utilities',
        'packages/example-data',
        'packages/fluent2-theme',
        'packages/font-icons-mdl2',
        'packages/foundation-legacy',
        'packages/merge-styles',
        'packages/react',
        'packages/react-date-time',
        'packages/react-docsite-components',
        'packages/react-examples',
        'packages/react-experiments',
        'packages/react-file-type-icons',
        'packages/react-focus',
        'packages/react-hooks',
        'packages/scheme-utilities',
        'packages/set-version',
        'packages/style-utilities',
        'packages/theme-samples',
        'packages/utilities',
      ]),
    );

    // Ensure that no react-components packages are included in the v8 release
    expect(v8Config.scope.some(scope => scope.startsWith('packages/react-components'))).toBe(false);

    expect(v8Config.changelog).toEqual(sharedConfig.changelog);
  });

  it(`should generate vNext release config`, () => {
    expect(vNextConfig.scope).toEqual(
      expect.arrayContaining([
        ...excludedPackagesFromReleaseProcess,
        'apps/perf-test-react-components',
        'apps/vr-tests-react-components',
      ]),
    );

    expect(vNextConfig.scope.some(scope => scope.startsWith('packages/react-'))).toBe(true);

    const includeScopes = vNextConfig.scope.filter(scope => !excludedPackagesFromReleaseProcess.includes(scope));

    expect(vNextConfig.changelog.customRenderers).toEqual(sharedConfig.changelog.customRenderers);
    expect(vNextConfig.changelog.groups).toEqual([
      {
        changelogPath: 'packages/react-components/react-components',
        masterPackageName: '@fluentui/react-components',
        include: includeScopes,
      },
    ]);
  });

  it(`should generate web-components release config`, () => {
    expect(webComponentsConfig.scope).toEqual(
      expect.arrayContaining([
        ...excludedPackagesFromReleaseProcess,
        'apps/vr-tests-web-components',
        'packages/web-components',
      ]),
    );

    expect(webComponentsConfig.changelog).toEqual(sharedConfig.changelog);
  });

  it(`should generate tools release config`, () => {
    expect(toolsConfig.scope).toEqual(
      expect.arrayContaining([
        ...excludedPackagesFromReleaseProcess,
        'packages/eslint-plugin',
        'scripts/api-extractor',
        'scripts/babel',
        'scripts/beachball',
        'scripts/cypress',
        'scripts/dangerjs',
        'scripts/executors',
        'scripts/fluentui-publish',
        'scripts/generators',
        'scripts/github',
        'scripts/gulp',
        'scripts/jest',
        'scripts/lint-staged',
        'scripts/monorepo',
        'scripts/package-manager',
        'scripts/perf-test-flamegrill',
        'scripts/prettier',
        'scripts/projects-test',
        'scripts/puppeteer',
        'scripts/storybook',
        'scripts/tasks',
        'scripts/test-ssr',
        'scripts/triage-bot',
        'scripts/ts-node',
        'scripts/update-release-notes',
        'scripts/utils',
        'scripts/webpack',
        'tools/eslint-rules',
        'tools/workspace-plugin',
      ]),
    );

    // Ensure that no v8/vNext packages are included in the tools release
    expect(toolsConfig.scope.some(scope => scope.startsWith('packages/react-components'))).toBe(false);

    expect(toolsConfig.changelog).toEqual(sharedConfig.changelog);
  });
});
