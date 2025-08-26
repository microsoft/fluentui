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
        '**/rit.config.js',
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

    // Ensure that no vNext packages are included in the v8 release
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
        'packages/react-components/babel-preset-storybook-full-source',
        'packages/react-components/eslint-plugin-react-components',
        'packages/react-components/react-conformance-griffel',
        'packages/react-components/react-storybook-addon',
        'packages/react-components/react-storybook-addon-export-to-sandbox',
        'packages/react-conformance',
      ]),
    );

    // Ensure that no v8/vNext UI packages are included in the tools release
    const nonToolsScopes = [
      'packages/react-components/react-components',
      'packages/react-components/react-text',
      'packages/react-components/react-card',
      'packages/react',
    ];
    const hasToolsTag = toolsConfig.scope.some(scope => nonToolsScopes.includes(scope));
    expect(hasToolsTag).toBe(false);

    expect(toolsConfig.changelog).toEqual(sharedConfig.changelog);
  });
});
