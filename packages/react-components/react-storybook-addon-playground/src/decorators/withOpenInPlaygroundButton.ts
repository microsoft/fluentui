import type { JSXElement } from '@fluentui/react-utilities';

import type { StoryContext } from '../types';
import { createPlaygroundUrl } from '../url';

export const PLAYGROUND_BUTTON_CLASS = 'with-open-in-playground-button';

/** Replaced by the addon's `webpackFinal` with the modules the playground can import. */
declare const __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__: string[] | undefined;

function getAllowedModules(): string[] | undefined {
  return typeof __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__ === 'undefined'
    ? undefined
    : __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__;
}

const importSpecifierPattern =
  /(?:^|[\s;])(?:import|export)\s+(type\s+)?(?:[\w*{}\s,$]+?\s+from\s+)?['"]([^'"]+)['"]|\brequire\(\s*['"]([^'"]+)['"]\s*\)/g;

/**
 * Returns the packages imported by the story source that the playground cannot load. Type-only imports are erased
 * before running. Relative imports are validated by `@fluentui/babel-preset-storybook-full-source`, which reports
 * them in `parameters.fullSourceUnsupportedImports`.
 */
export function getUnavailableImports(source: string, allowedModules: string[]): string[] {
  const unavailable = new Set<string>();

  for (const match of source.matchAll(importSpecifierPattern)) {
    const [, typeOnly, importSpecifier, requireSpecifier] = match;
    const specifier = importSpecifier ?? requireSpecifier;
    if (!specifier || typeOnly) {
      continue;
    }
    if (!specifier.startsWith('.') && !allowedModules.includes(specifier)) {
      unavailable.add(specifier);
    }
  }

  return Array.from(unavailable);
}

// SVG icon: code brackets, matches the look of the sibling "Open in ..." buttons
const codeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M4.5 3.5 1 7l3.5 3.5"/><path d="M9.5 3.5 13 7l-3.5 3.5"/><path d="M8.25 2 5.75 12"/></svg>`;

/**
 * Decorator that adds an "Open in Playground" button next to "Show code" in Storybook Docs view.
 *
 * @param storyFn - original story function
 * @param context - story context
 * @returns - decorated story
 */
export const withOpenInPlaygroundButton = (
  storyFn: (context: StoryContext) => JSXElement,
  context: StoryContext,
): JSXElement => {
  if (context.viewMode === 'docs' && !context.parameters.playground?.disable) {
    addOpenInPlaygroundButton(context);
  }

  return storyFn(context);
};

export function addOpenInPlaygroundButton(context: StoryContext): void {
  const source = context.parameters.fullSource;

  if (context.parameters.fullSourceUnsupportedImports?.length) {
    return;
  }

  const allowedModules = getAllowedModules();
  if (source && allowedModules && getUnavailableImports(source, allowedModules).length > 0) {
    return;
  }

  if (!source) {
    // eslint-disable-next-line no-console
    console.warn(
      `Playground Addon: Couldn't find source for story "${context.title} - ${context.name}". ` +
        'Is @fluentui/babel-preset-storybook-full-source (registered via @fluentui/react-storybook-addon-export-to-sandbox) installed?',
    );
    return;
  }

  getButtonContainers(context).forEach(({ container, cssClasses }) => {
    const button = document.createElement('button');
    button.classList.add(...cssClasses);
    button.setAttribute('type', 'button');
    button.innerHTML = `${codeIconSvg} Open in Playground`;
    button.addEventListener('click', () => {
      window.open(
        createPlaygroundUrl(
          source,
          undefined,
          context.parameters.cssModuleSources?.cssModules,
          getPlaygroundTitle(context),
        ),
        '_blank',
        'noopener',
      );
    });

    container.prepend(button);
  });
}

/**
 * Names the example after the story, e.g. `Button: Appearance` for the "Appearance" story of `Components/Button`.
 */
export function getPlaygroundTitle(context: Pick<StoryContext, 'title' | 'name'>): string {
  const component = context.title?.split('/').pop()?.trim();

  return [component, context.name?.trim()].filter(Boolean).join(': ');
}

function getButtonContainers(context: StoryContext) {
  // Support anchor ID formats for our Storybook major versions range.
  // 10< `#anchor--{id}`
  // >=10 `#anchor--primary--{id}`
  // See: https://github.com/storybookjs/storybook/pull/33384
  const docsSelector = `#anchor--${context.id} .docs-story, #anchor--primary--${context.id} .docs-story`;
  const rootElements = document.querySelectorAll(docsSelector);

  return Array.from(rootElements).flatMap(rootElement => {
    // The original Storybook "Show code" toggle. Sibling addons (export-to-sandbox) add their own buttons with the same
    // base class, so exclude them explicitly.
    const showCodeButton = rootElement.querySelector(
      `.docblock-code-toggle:not(.${PLAYGROUND_BUTTON_CLASS}):not(.with-code-sandbox-button):not(.with-open-in-new-tab-button)`,
    );
    const container = showCodeButton?.parentElement;

    if (!showCodeButton || !container) {
      return [];
    }

    // remove button if it already existed (story re-render)
    container.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`).forEach(node => node.remove());

    const cssClasses = [...Array.from(showCodeButton.classList), PLAYGROUND_BUTTON_CLASS];

    return [{ container, cssClasses }];
  });
}
