import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'cypress-storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withKeytipLayer, withStrictMode } from '@fluentui/storybook';

/**
 * "PACKAGE_NAME" placeholder is being replaced by webpack loader - @link {./preview.loader}
 * @type {string}
 */
const packageNamePlaceholder = 'PACKAGE_NAME';

addDecorator(withPerformance);
addCustomDecorators();

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
 * Add various storybook decorators narrowed by package name.
 *
 * NOTE:
 *  - this is a temporary workaround until we migrate to new storybook 6 APIs -> old `addDecorator` duplicates rendered decorators
 *  - source of this function is interpolated during runtime with webpack
 *
 */
function addCustomDecorators() {
  /**
   * @type {Set<import('@storybook/react').DecoratorFn>}
   */
  const customDecorators = new Set();

  if (['react-cards', 'react-tabs'].includes(packageNamePlaceholder)) {
    initializeIcons();
    customDecorators.add(withStrictMode);
  }

  customDecorators.add(withKeytipLayer);

  customDecorators.forEach(decorator => addDecorator(decorator));
}

/**
 * @typedef {{
 *   default: { title: string };
 *   [subStoryName: string]: React.FunctionComponent | { title: string };
 * }} Story
 */

/**
 * @typedef {{ [exportName: string]: React.ComponentType }} ComponentModule
 */

function loadStories() {
  /** @type {Map<string, Story>} */
  const stories = new Map();

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
      generateStoriesFromExamples(key, stories, req);
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
  //   ./package-name/ComponentName/ComponentName.Something.Example.tsx
  //   ./package-name/src/.../ComponentName.stories.tsx - @TODO remove this line after new storybook setup has been applied for all converged packages
  const segments = key.split('/');

  if (segments.length < 3) {
    console.warn(`Invalid storybook context location found: key: ${key} | segments: ${segments}`);
    return;
  }

  const isCollocatedStory = segments.includes('src');

  if (key.endsWith('.mdx') || isCollocatedStory) {
    // opt out of the custom naming for mdx and collocated, use meta information

    const content = req(key);
    if (content.default) {
      stories.set(key, req(key));
    } else {
      console.warn(`No default export in ${key} - stories ignored`);
    }
    return;
  }

  const componentName = generateComponentName(segments);

  if (!stories.has(componentName)) {
    stories.set(componentName, {
      default: {
        title: 'Components/' + componentName,
      },
    });
  }

  const storyName = segments.slice(-1)[0].replace('.tsx', '').replace(/\./g, '_');

  const story = stories.get(componentName);
  const exampleModule = /** @type {(key: string) => ComponentModule} */ (req)(key);

  if (!story) {
    console.warn(`No stories for component: ${componentName}`);
    return;
  }

  for (let moduleExport of Object.keys(exampleModule)) {
    const ExampleComponent = exampleModule[moduleExport];
    const subStoryName = moduleExport || storyName;

    if (typeof ExampleComponent === 'function') {
      if (ExampleComponent.prototype.render) {
        // class component
        story[subStoryName] = () => React.createElement(ExampleComponent);
      } else {
        // function component
        story[subStoryName] = /** @type {React.FunctionComponent} */ (ExampleComponent);
      }
    }
  }

  /**
   *
   * @param {string[]} segments
   * @returns {string} component name
   */
  function generateComponentName(segments) {
    /**
     * ./ComponentName/ComponentName.Something.Example.tsx
     */
    const isReactExamplesStory = segments.length === 3;

    if (isReactExamplesStory) {
      // ./ComponentName/ComponentName.Something.Example.tsx
      //  ↓↓↓
      // [., ComponentName, ComponentName.Something.Example.tsx]
      return segments[1];
    }

    // .package-name/ComponentName/ComponentName.Something.Example.tsx
    //  ↓↓↓
    // [., package-name, ComponentName, ComponentName.Something.Example.tsx]
    return segments[2];
  }
}
