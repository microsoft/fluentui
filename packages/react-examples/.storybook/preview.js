import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'cypress-storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import { withFluentProvider, withKeytipLayer, withStrictMode } from '@fluentui/storybook';

/**
 * "PACKAGE_NAME" placeholder is being replaced by webpack loader - @link {./preview.loader}
 * @type {string}
 */
const packageNamePlaceholder = 'PACKAGE_NAME';
const storyOrder = [
  'Concepts/Introduction',
  'Concepts/Developer/Quick Start',
  'Concepts/Developer/Styling Components',
  'Concepts',
  'Theme',
  'Components',
  'Migrations/Flex/Overview',
];

addDecorator(withPerformance);
addCustomDecorators();

addParameters({
  a11y: {
    manual: true,
  },
});

configure(loadStories, module);

export const parameters = {
  options: {
    storySort: {
      order: storyOrder,
    },
  },
};

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

  if (['react-cards', 'react-checkbox', 'react-tabs', 'react-toggle'].includes(packageNamePlaceholder)) {
    initializeIcons();
    customDecorators.add(withStrictMode);
  }

  if (['react-button', 'react-components', 'react-tooltip'].includes(packageNamePlaceholder)) {
    customDecorators.add(withFluentProvider).add(withStrictMode);
  }

  // add decorators to all stories except vNext react-components suite
  // - this is needed so we don't creep v8 dependencies to vNext deps
  // - `withKeytipLayer` is v8 dependency - including it to vNext suite was causing CI errors - `Cannot read property 'disableGlobalClassNames' of undefined `
  if (packageNamePlaceholder !== 'react-components') {
    customDecorators.add(withKeytipLayer);
  }

  customDecorators.forEach(decorator => addDecorator(decorator));
}

/**
 *
 * @param {string} storyName
 */
function getStoryOrder(storyName) {
  for (let i = 0; i < storyOrder.length; i++) {
    if (storyName.startsWith(storyOrder[i])) {
      return i;
    }
  }
  return storyOrder.length;
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

  if (packageNamePlaceholder === 'react' || packageNamePlaceholder === 'react-components') {
    // For suite package storybooks, also show the examples of re-exported component packages.
    // preview-loader will replace REACT_ DEPS with the actual list.
    contexts.push(
      require.context('../src', true, /(REACT_DEPS|PACKAGE_NAME)\/\w+\/[\w.]+\.(Example|stories)\.(tsx|mdx)$/),
    );
  }

  // @TODO
  // - this is a temporary solution until all converged packages use new storybook configuration
  // - after new config is in place remove this whole IF
  if (packageNamePlaceholder === 'react-components') {
    // include package collocated stories within react-components
    contexts.push(require.context('../../', true, /(REACT_DEPS)\/src\/[\w./]+\.(Example|stories)\.(tsx|mdx)$/));
  }

  for (const req of contexts) {
    req.keys().forEach(key => {
      generateStoriesFromExamples(key, stories, req);
    });
  }

  // convert stories Set to array
  const sorted = [...stories.values()].sort((s1, s2) => {
    const order1 = getStoryOrder(s1.default.title);
    const order2 = getStoryOrder(s2.default.title);
    if (order1 < order2) {
      // the lowest order goes first
      return -1;
    }
    if (order1 > order2) {
      return 1;
    }
    return s1.default.title > s2.default.title ? 1 : -1;
  });
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
