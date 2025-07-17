// @ts-check

const storybookConfig = require('./.storybook/main');

/**
 * Config for the LLMs docs generator script.
 * @see {@link file://./../../scripts/storybook/src/scripts/generate-llms-docs.ts}
 *
 * @type {import('../../scripts/storybook/src/scripts/generate-llms-docs').Args}
 */
module.exports = {
  distPath: './dist/storybook',
  // baseUrl: 'https://react.fluentui.dev',
  // TODO: revert this to the correct url before merging
  baseUrl: 'https://fluentuipr.z22.web.core.windows.net/pull/34838/public-docsite-v9/storybook',
  summaryTitle: 'Fluent UI React v9',
  summaryDescription:
    "Fluent UI React is a library of React components that implement Microsoft's [Fluent Design System](https://fluent2.microsoft.design).",
  refs: Object.values(storybookConfig.refs ?? {}),
};
