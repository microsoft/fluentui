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

const slotRegex = /as\?:\s*"([^"]+)"/;

/**
 *
 * @param {import('@storybook/types').StoryContextForEnhancers} context
 */
const withSlotEnhancer = context => {
  const updatedArgTypes = { ...context.argTypes };

  Object.entries(updatedArgTypes).forEach(([key, argType]) => {
    // @ts-expect-error - storybook doesn't ship these types
    const value = argType?.type?.value;

    if (value && typeof value === 'string') {
      const match = value.match(slotRegex);
      if (match) {
        updatedArgTypes[key].table.type.summary = `Slot<'${match[1]}'>`;
      }
    }
  });

  return updatedArgTypes;
};

export const argTypesEnhancers = [withSlotEnhancer];
