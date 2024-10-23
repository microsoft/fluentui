import { teamsDarkTheme, teamsLightTheme, webDarkTheme, webLightTheme } from '@fluentui/tokens';
import * as prettier from 'prettier';
import prettierPluginHTML from 'prettier/parser-html.js';
import { setTheme } from '../src/theme/set-theme.js';
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

function changeTheme(/** @type {Event} */ e) {
  setTheme(themes[/** @type {keyof themes} */ (/** @type {HTMLInputElement}*/ (e.target).value)]);
}

// This is needed in Playwright.
Object.defineProperty(window, 'setTheme', { value: setTheme });

document.getElementById('theme-switch')?.addEventListener('change', changeTheme, false);
setTheme(themes['web-light']);

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
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
