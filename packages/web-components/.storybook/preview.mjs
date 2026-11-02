import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import * as prettier from 'prettier';
import prettierPluginHTML from 'prettier/parser-html.js';
import webcomponentsTheme from './theme.mjs';
import { setStorybookHelpersConfig } from './wc-toolkit-helpers.js';

import '../src/index-rollup.js';
import './docs-root.css';

// Load the Custom Elements Manifest for Storybook helpers
// @ts-ignore — JSON import attribute not needed in Vite, TS NodeNext is overly strict here
import customElementsManifest from '../custom-elements.json';
// @ts-ignore — Storybook global
window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__ = customElementsManifest;

// Configure CEM-based argTypes generation
setStorybookHelpersConfig({
  typeRef: 'parsedType',
  hideArgRef: true,
  categoryOrder: ['attributes', 'properties', 'slots', 'cssProps', 'cssParts', 'cssStates', 'methods', 'events'],
});

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
