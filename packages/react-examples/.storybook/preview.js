import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'cypress-storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withKeytipLayer, withStrictMode } from '@fluentui/storybook';

initializeIcons();

// This API is deprecated (in favor of `export const decorators = []`) but the new way appears not
// to work when using the legacy configure() API
addDecorator(withPerformance);
addDecorator(withStrictMode);
addDecorator(withKeytipLayer);

// This API is deprecated (in favor of `export const parameters = {}`) but same issue as above
addParameters({
  a11y: /** @type {import('@storybook/addon-a11y').A11yParameters} */ ({
    manual: true,
  }),
});

// This API is deprecated and will no longer work in storybook 7 or with storyStoreV7.
// https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-configure
// The selective loading functionality currently implemented by preview-loader can be more easily
// handled by just settings `stories: [/*glob*/]` in main.js, but it's unclear if a replacement is
// available for transforming files before loading as stories.
configure(loadStories, module);

// ==========================================================
//   Helpers for loading examples in component story format
// ==========================================================

/**
 * @typedef {{
 *   default: { title: string };
 *   [storyName: string]: React.FunctionComponent | { title: string };
 * }} StoryGroup - Group of stories for a particular component (follows component story format)
 *
 * @typedef {{
 *   [exportName: string]: React.ComponentType;
 * }} ExampleModule - A loaded `*.Example.tsx` or `*.stories.tsx` file, exporting an example component
 */

/**
 * Read the `*.Example.tsx` and/or `*.stories.tsx` files for the current package `start-storybook`
 * is running in and generate a list of stories in component story format.
 */
function loadStories() {
  /** @type {Map<string, StoryGroup>} */
  const stories = new Map();

  /** @type {__WebpackModuleApi.RequireContext[]} */
  const contexts = [
    // This will be updated by preview-loader with the actual current package name
    require.context('../src/PACKAGE_NAME', true, /\.(Example|stories)\.tsx$/),
  ];

  // This will be replaced with the actual package name by the custom webpack loader ./preview-loader.js
  // (note: for some reason the replacement doesn't work if the const is outside the function)
  const packageNamePlaceholder = /** @type {string} */ ('PACKAGE_NAME');

  if (packageNamePlaceholder === 'react') {
    // For @fluentui/react's storybook, also include examples from @fluentui/react-focus
    contexts.push(require.context('../src/react-focus', true, /\.(Example|stories)\.tsx$/));
  }

  for (const req of contexts) {
    req.keys().forEach(key => {
      generateStoriesForExampleFile(key, stories, req);
    });
  }

  // convert stories Set to array
  const sorted = [...stories.values()].sort((s1, s2) => (s1.default.title > s2.default.title ? 1 : -1));

  return sorted;
}

/**
 * Generate stories (usually one story) for a `*.Example.tsx` or `*.stories.tsx` file
 * @param {string} key - key for the module in require.context (the relative path to the module
 * from the root path passed to require.context)
 * @param {Map<string, StoryGroup>} stories - mapping from component path (`Components/<ComponentName>`) to stories
 * @param {__WebpackModuleApi.RequireContext} req
 */
function generateStoriesForExampleFile(key, stories, req) {
  // The key will be like this:
  //   ./ComponentName/ComponentName.Something.Example.tsx
  // group 1: component name
  const pathParts = key.match(/\/(\w+)\/[\w.]+$/);
  if (!pathParts) {
    console.error(`Invalid path found in storybook require.context: "${key}"`);
    return;
  }

  const componentName = pathParts[1];
  const componentPath = `Components/${componentName}`;

  if (!stories.has(componentPath)) {
    stories.set(componentPath, {
      // A default "export" with a title is required by component story format
      default: {
        title: componentPath,
      },
    });
  }

  const storyGroup = /** @type {StoryGroup} */ (stories.get(componentPath));
  const exampleModule = /** @type {(key: string) => ExampleModule} */ (req)(key);

  for (const [exportName, ExampleComponent] of Object.entries(exampleModule)) {
    const storyName = exportName.replace(componentName, '').replace(/Example$/, '');

    if (typeof ExampleComponent === 'function') {
      if (ExampleComponent.prototype.render) {
        // class component -- make a wrapper function component
        storyGroup[storyName] = () => React.createElement(ExampleComponent);
      } else {
        // function component
        storyGroup[storyName] = /** @type {React.FunctionComponent} */ (ExampleComponent);
      }
    }
  }
}
