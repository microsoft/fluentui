import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import * as prettier from 'prettier';
import prettierPluginHTML from 'prettier/parser-html.js';
import webcomponentsTheme from './theme.mjs';

import '../src/index-rollup.js';
import './docs-root.css';

const FAST_EXPRESSION_COMMENTS = /<!--((fast-\w+)\{.*\}\2)?-->/g; // Matches comments that contain FAST expressions

const themes = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
};

// This is needed in Playwright.
// @ts-ignore - setTheme is set on globalThis.Fluent by the index-rollup bundle
Object.defineProperty(window, 'Fluent', { value: globalThis.Fluent });

// @ts-ignore - setTheme is set on globalThis.Fluent by the index-rollup bundle
Fluent.setTheme(themes['web-light']);

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'web-light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'web-light', title: 'Web Light' },
        { value: 'web-dark', title: 'Web Dark' },
        { value: 'teams-light', title: 'Teams Light' },
        { value: 'teams-dark', title: 'Teams Dark' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  dir: {
    name: 'Direction',
    description: 'Text direction',
    defaultValue: 'ltr',
    toolbar: {
      icon: 'transfer',
      items: [
        { value: 'ltr', title: 'LTR' },
        { value: 'rtl', title: 'RTL' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

/**
 * @type {import('@storybook/html').Decorator[]}
 */
export const decorators = [
  (Story, context) => {
    /**
     * @type {keyof typeof themes}
     */
    const theme = context.globals.theme || 'web-light';
    // @ts-ignore - setTheme is set on globalThis.Fluent by the index-rollup bundle
    Fluent.setTheme(themes[theme]);

    // Set direction on the document body
    const dir = context.globals.dir || 'ltr';
    document.querySelectorAll('.docs-story').forEach(el => el.setAttribute('dir', dir));

    return Story();
  },
];

/** @param {{ argTypes?: Record<string, any> }} context */
function withOrderedCategories(context) {
  if (!context.argTypes) {
    return context.argTypes;
  }

  console.log('UNFILTERED ARGTYPES KEYS:', Object.keys(context.argTypes));
  console.log('UNFILTERED CATEGORIES:', Object.values(context.argTypes).map(a => a.table?.category));

  /** @param {string | undefined} cat */
  function getCategoryIndex(cat) {
    if (!cat) return -1;
    const clean = cat.toLowerCase().trim().replace(/[\s-_]+/g, '');
    if (clean === 'attributes' || clean === 'attribute' || clean === 'ariaattributes') return 0;
    if (clean === 'properties' || clean === 'property') return 1;
    if (clean === 'slots' || clean === 'slot') return 2;
    if (clean === 'csscustomproperties' || clean === 'csscustomproperty' || clean === 'cssprops' || clean === 'cssproperties' || clean === 'cssvariables' || clean === 'cssvariable') return 3;
    if (clean === 'cssparts' || clean === 'csspart') return 4;
    if (clean === 'cssstates' || clean === 'cssstate') return 5;
    if (clean === 'methods' || clean === 'method') return 6;
    if (clean === 'events' || clean === 'event') return 7;
    return -1;
  }

  const sortedEntries = Object.entries(context.argTypes).sort(([aKey, aArg], [bKey, bArg]) => {
    const aCategory = aArg.table?.category;
    const bCategory = bArg.table?.category;

    const aIndex = getCategoryIndex(aCategory);
    const bIndex = getCategoryIndex(bCategory);

    // If both have assigned indices, sort by index
    if (aIndex !== -1 && bIndex !== -1) {
      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }
    } else if (aIndex !== -1) {
      return -1; // Standard categories with index come first
    } else if (bIndex !== -1) {
      return 1;
    } else if (aCategory && bCategory) {
      // Both are non-standard categories; sort them alphabetically
      const catCompare = aCategory.localeCompare(bCategory);
      if (catCompare !== 0) return catCompare;
    } else if (aCategory) {
      return -1;
    } else if (bCategory) {
      return 1;
    }

    // Within the same category index or name (or if neither has a category), sort alphabetically by key
    return aKey.localeCompare(bKey);
  });

  const sortedResult = Object.fromEntries(sortedEntries);
  console.log('SORTED ARGTYPES KEYS:', Object.keys(sortedResult));
  console.log('SORTED CATEGORIES:', Object.values(sortedResult).map(a => a.table?.category));

  return sortedResult;
}

// Ensure withOrderedCategories is run after Storybook's built-in enhancers (inferArgTypes, inferControls)
if (typeof window !== 'undefined') {
  const alignEnhancers = () => {
    const store = /** @type {any} */ (window)['__STORYBOOK_PREVIEW__']?.storyStoreValue;
    if (store && store.projectAnnotations && store.projectAnnotations.argTypesEnhancers) {
      const enhancers = store.projectAnnotations.argTypesEnhancers;
      const idx = enhancers.findIndex((/** @type {any} */ e) => e.name === 'withOrderedCategories');
      if (idx !== -1) {
        // Move withOrderedCategories to the end of the array so it runs after inferArgTypes/inferControls
        const [withOrdered] = enhancers.splice(idx, 1);
        enhancers.push(withOrdered);
      }
    } else {
      setTimeout(alignEnhancers, 10);
    }
  };
  alignEnhancers();
}

export const argTypesEnhancers = [withOrderedCategories];

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true, sort: 'none' },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Concepts', ['Introduction', 'Developer', ['Quick Start']], 'Components', 'Theme'],
    },
  },
  docs: {
    argTypes: { sort: 'none' },
    stories: {
      filter: (/** @type {any} */ story) => story.name.toLowerCase() === 'default',
    },
    source: {
      // To get around the inability to change Prettier options in the source addon, this transform function
      // imports the standalone Prettier and uses it to format the source with the desired options.
      transform(/** @type {string} */ src, /** @type {import('@storybook/html').StoryContext} */ storyContext) {
        if (!src) {
          const fragment = storyContext.originalStoryFn(storyContext.allArgs, storyContext);
          if (!(fragment instanceof DocumentFragment) && !(fragment instanceof HTMLElement)) {
            return;
          }

          const div = document.createElement('div');
          div.append(fragment);
          src = div.innerHTML;
        }

        src = src.replace(FAST_EXPRESSION_COMMENTS, ''); // remove comments
        src = src.replace(/=""/g, ''); // remove values for boolean attributes
        src = prettier.format(src, {
          htmlWhitespaceSensitivity: 'ignore',
          parser: 'html',
          plugins: [prettierPluginHTML],
        });
        return src;
      },
    },
    theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
  },
};

export const tags = ['autodocs'];
