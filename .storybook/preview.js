import './docs-root.css';
import '../packages/react-components/react-storybook-addon-export-to-sandbox/src/styles.css';
import { withLinks } from '@storybook/addon-links';

/** @typedef {import('../packages/react-components/react-storybook-addon-export-to-sandbox/src/public-types').ParametersExtension & import('@storybook/react').Parameters} Parameters */

/** @type {import('@storybook/react').Decorator[]} */
export const decorators = [withLinks];

/** @type {Parameters} */
export const parameters = {
  viewMode: 'docs',
  controls: {
    disable: true,
    expanded: true,
  },
  docs: {
    source: {
      excludeDecorators: true,
      type: 'code',
    },
  },
  exportToSandbox: {
    provider: 'stackblitz-cloud',
    bundler: 'vite',
    requiredDependencies: {
      // for React
      react: '^18',
      'react-dom': '^18',
      // necessary for FluentProvider:
      '@fluentui/react-components': '^9.0.0',
    },
    optionalDependencies: {
      '@fluentui/react-icons': 'latest',
    },
  },
};
