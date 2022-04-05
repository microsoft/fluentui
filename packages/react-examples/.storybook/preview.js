import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'cypress-storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withKeytipLayer, withStrictMode } from '@fluentui/storybook';

/**
 * This placeholder will be replaced with the actual package name by custom webpack loader `./preview-loader.js`
 * @type {string}
 */
const packageNamePlaceholder = 'PACKAGE_NAME';

initializeIcons();

addDecorator(withPerformance);
addDecorator(withStrictMode);
addDecorator(withKeytipLayer);

addParameters({
  a11y: {
    manual: true,
  },
});

configure(loadStories, module);

export const parameters = {};

// ================================
//          Helpers
// ================================

/**
 * @typedef {{
 *   default: { title: string };
 *   [subStoryName: string]: React.FunctionComponent | { title: string };
 * }} Story
 *
 * @typedef {{ [exportName: string]: React.ComponentType }} ComponentModule
 */

/** */
function loadStories() {
  /** @type {Map<string, Story>} */
  const stories = new Map();

  // This shows some extra e2e-only stories
  const includeE2E = new URLSearchParams(location.search).has('e2e');

  /** @type {__WebpackModuleApi.RequireContext[]} */
  const contexts = [
    // This will be updated by preview-loader with the actual current package name
    require.context('../src/PACKAGE_NAME', true, /\.(Example|stories)\.tsx$/),
  ];

  if (packageNamePlaceholder === 'react') {
    // For suite package storybooks, also show the examples of re-exported component packages.
    // preview-loader will replace REACT_ DEPS with the actual list.
    contexts.push(
      require.context('../src', true, /(REACT_DEPS|PACKAGE_NAME)\/\w+\/[\w.]+\.(Example|stories)\.(tsx|mdx)$/),
    );
  }

  for (const req of contexts) {
    req.keys().forEach(key => {
      if (includeE2E || !key.includes('/e2e/')) {
        generateStoriesFromExamples(key, stories, req);
      }
    });
  }

  // convert stories Set to array
  const sorted = [...stories.values()].sort((s1, s2) => (s1.default.title > s2.default.title ? 1 : -1));

  return sorted;
}

/**
 * @param {string} key - key for the module in require.context (the relative path to the module
 * from the root path passed to require.context)
 * @param {Map<string, Story>} stories
 * @param {__WebpackModuleApi.RequireContext} req
 */
function generateStoriesFromExamples(key, stories, req) {
  // Depending on the starting point of the context, and the package layout, the key will be like one of these:
  //   ./ComponentName/ComponentName.Something.Example.tsx
  //   ./ComponentName/e2e/ComponentName.Something.stories.tsx
  //   ./package-name/ComponentName/ComponentName.Something.Example.tsx
  //   ./package-name/ComponentName/e2e/ComponentName.Something.Example.tsx
  // group 1: component name
  // group 2: /e2e part (if present)
  // group 3: story name
  const pathParts = key.match(/\/(\w+)(\/e2e)?\/[\w.]+$/);
  if (!pathParts) {
    console.error(`Invalid path found in storybook require.context: "${key}"`);
    return;
  }

  const [, componentName, e2e = ''] = pathParts;
  // This will be like either:
  //   Components/ComponentName
  //   Components/ComponentName/e2e
  const componentPath = `Components/${componentName}${e2e}`;

  if (!stories.has(componentPath)) {
    stories.set(componentPath, {
      default: {
        title: componentPath,
      },
    });
  }

  const story = /** @type {Story} */ (stories.get(componentPath));
  const exampleModule = /** @type {(key: string) => ComponentModule} */ (req)(key);

  for (const [moduleExport, ExampleComponent] of Object.entries(exampleModule)) {
    const subStoryName = moduleExport.replace(componentName, '').replace(/Example$/, '');

    if (typeof ExampleComponent === 'function') {
      if (ExampleComponent.prototype.render) {
        // class component -- make a wrapper function component
        story[subStoryName] = () => React.createElement(ExampleComponent);
      } else {
        // function component
        story[subStoryName] = /** @type {React.FunctionComponent} */ (ExampleComponent);
      }
    }
  }
}
