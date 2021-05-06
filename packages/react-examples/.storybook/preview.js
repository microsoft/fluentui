import * as React from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withPerformance } from 'storybook-addon-performance';
import { withFluentProvider, withKeytipLayer, withStrictMode } from '@fluentui/storybook';

/**
 * "PACKAGE_NAME" placeholder is being replaced by webpack loader - @link {./preview.loader}
 * @type {string}
 */
const packageNamePlaceholder = 'PACKAGE_NAME';

addDecorator(withInfo);
addDecorator(withPerformance);
addDecorator(withKeytipLayer);
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
      order: ['Concepts/Introduction', 'Concepts/Developer', 'Concepts', 'Components'],
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

  if (
    ['react-button', 'react-cards', 'react-checkbox', 'react-slider', 'react-tabs', 'react-toggle'].includes(
      packageNamePlaceholder,
    )
  ) {
    initializeIcons();
    customDecorators.add(withStrictMode);
  }

  if (
    [
      'react-avatar',
      'react-badge',
      'react-button',
      'react-divider',
      'react-image',
      'react-link',
      'react-accordion',
      'react-menu',
      'react-text',
      'react-components',
      'react-portal',
    ].includes(packageNamePlaceholder)
  ) {
    customDecorators.add(withFluentProvider).add(withStrictMode);
  }

  customDecorators.forEach(decorator => addDecorator(decorator));
}

/**
 *
 * @param {string} storyName
 */
function getStoryOrder(storyName) {
  const order = ['Concepts/Introduction', 'Concepts', 'Components'];
  for (let i = 0; i < order.length; i++) {
    if (storyName.startsWith(order[i])) {
      return i;
    }
  }
  return order.length;
}

/**
 * @typedef {{
 *   default: { title: string, id: string };
 *   [subStoryName: string]: React.FunctionComponent | { title: string, id: string };
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

  if (key.endsWith('.mdx')) {
    // out out of the custom naming for mdx, use meta information
    stories.set(key, req(key));
    return;
  }

  const { componentName, componentId } = generateComponentName(segments);

  if (!stories.has(componentName)) {
    stories.set(componentName, {
      default: {
        title: 'Components/' + componentName,
        id: 'Components/' + componentId,
      },
    });
  }

  const storyName = segments
    .slice(-1)[0]
    .replace('.tsx', '')
    .replace(/\./g, '_');

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
   * @returns {{componentName:string; componentId:string}}
   */
  function generateComponentName(segments) {
    /**
     *  @TODO
     * - this is a temporary solution until all converged packages use new storybook configuration
     *  - after new config is in place remove this
     *
     * ./<package-name>/src/.../ComponentName.Something.Example.tsx
     */
    const isCollocatedStory = segments.includes('src');

    /**
     * ./ComponentName/ComponentName.Something.Example.tsx
     */
    const isReactExamplesStory = segments.length === 3;

    /**
     * For @fluentui/react, don't include the package name in the sidebar
     * ./package-name/ComponentName/ComponentName.Something.Example.tsx
     */
    // @ts-ignore -- PACKAGE_NAME is replaced by a loader
    const isReactPackageStory = 'PACKAGE_NAME' === 'react';

    // @TODO
    // - this is a temporary solution until all converged packages use new storybook configuration
    // - after new config is in place remove this whole IF
    if (isCollocatedStory) {
      // ./<package-name>/src/.../ComponentName.Something.Example.tsx
      //  ↓↓↓
      // [., <package-name>, src, ..., ComponentName, ComponentName.Something.Example.tsx]
      const packageName = segments[1];
      const storyFileName = segments[segments.length - 1];
      const [, storyName] = /(\w+)\.(Example|stories)\.(tsx|mdx)$/.exec(storyFileName) || [];

      const componentName = `${storyName} (${packageName})`;
      const componentId = storyName;

      return { componentName, componentId };
    }

    if (isReactExamplesStory) {
      // ./ComponentName/ComponentName.Something.Example.tsx
      //  ↓↓↓
      // [., ComponentName, ComponentName.Something.Example.tsx]
      const componentName = segments[1];
      const componentId = segments[1];

      return { componentName, componentId };
    }

    if (isReactPackageStory) {
      // ./package-name/ComponentName/ComponentName.Something.Example.tsx
      //  ↓↓↓
      // [., <package-name>, ComponentName, ComponentName.Something.Example.tsx]
      const componentName = segments[1];
      const componentId = segments[2];

      return { componentName, componentId };
    }

    return {
      componentName: `${segments[2]} (${segments[1]})`,
      // Story URLs are generated based off the story name
      // In the case of `react-components` a (package name) suffix is added to each story
      // This results in a difference name and URL between individual storybooks and the react-components suite storybook
      // https://storybook.js.org/docs/react/configure/sidebar-and-urls#permalinking-to-stories
      // Use the id property in stories to ensure the same URL between individual and suite storybook
      componentId: segments[2],
    };
  }
}
