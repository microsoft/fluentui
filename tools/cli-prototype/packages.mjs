export const localPackages = [
  {
    packageName: '@fluentui/api-metadata',
    project: 'api-metadata',
    packageRoot: 'tools/api-metadata',
    catalog: false,
    runtimeEntrypoints: ['.', './generator'],
  },
  {
    packageName: '@fluentui/cli',
    project: 'cli',
    packageRoot: 'tools/cli',
    catalog: false,
    runtimeEntrypoints: [],
  },
];

export const suiteAlias = { name: 'fluent-forum-styled', package: '@fluentui/react-components' };

export const catalogExclusions = {
  '@fluentui/babel-preset-global-context': 'Build-time Babel tooling, not a component/runtime API.',
  '@fluentui/babel-preset-storybook-full-source': 'Storybook build tooling.',
  '@fluentui/eslint-plugin-react-components': 'Repository lint tooling.',
  '@fluentui/react-conformance-griffel': 'Component conformance test tooling.',
  '@fluentui/react-migration-v0-v9': 'Cross-version Northstar migration adapter, outside the v9 component surface.',
  '@fluentui/react-migration-v8-v9': 'Cross-version v8 migration adapter, outside the v9 component surface.',
  '@fluentui/react-storybook-addon': 'Storybook documentation tooling.',
  '@fluentui/react-storybook-addon-export-to-sandbox': 'Storybook sandbox tooling.',
  '@fluentui/react-storybook-addon-playground': 'Storybook playground tooling.',
  '@fluentui/react-theme-sass': 'Sass assets with an intentionally empty JavaScript declaration surface.',
};
