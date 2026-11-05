import type { JSXElement } from '@fluentui/react-utilities';

import type { StoryContext } from '../types';
import { getModuleReferences } from '../moduleScanner';
import { createPlaygroundUrl } from '../url';

export const PLAYGROUND_BUTTON_CLASS = 'with-open-in-playground-button';
export const PLAYGROUND_DOCS_ACTION_CLASS = 'with-open-in-playground-docs-action';
const DECORATOR_BUTTON_ATTRIBUTE = 'data-playground-decorator';

/** Replaced by the addon's `webpackFinal` with the modules the playground can import. */
declare const __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__: string[] | undefined;

function getAllowedModules(): string[] | undefined {
  return typeof __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__ === 'undefined'
    ? undefined
    : __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__;
}

/**
 * Returns the packages imported by the story source that the playground cannot load. Type-only imports are erased
 * before running. Relative imports are validated by `@fluentui/babel-preset-storybook-full-source`, which reports
 * incomplete extraction with `parameters.fullSourceIsRunnable: false`; `fullSourceUnsupportedImports` is retained
 * for diagnostics and compatibility with earlier transforms.
 */
export function getUnavailableImports(source: string, allowedModules: string[]): string[] {
  const unavailable = new Set<string>();

  for (const { specifier, typeOnly } of getModuleReferences(source)) {
    if (!typeOnly && !specifier.startsWith('.') && !allowedModules.includes(specifier)) {
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
  if (context.viewMode === 'docs') {
    addOpenInPlaygroundButton(context);
  }

  return storyFn(context);
};

export function addOpenInPlaygroundButton(context: StoryContext): void {
  const targetDocument = context.canvasElement?.ownerDocument;
  if (!targetDocument) {
    return;
  }

  const buttonContainers = getButtonContainers(context, targetDocument);
  const action = getOpenInPlaygroundAction(context, targetDocument);
  if (!action) {
    return;
  }

  buttonContainers.forEach(({ container, cssClasses }) => {
    const button = targetDocument.createElement('button');
    button.classList.add(...cssClasses);
    button.setAttribute('type', 'button');
    button.setAttribute(DECORATOR_BUTTON_ATTRIBUTE, '');
    button.innerHTML = `${codeIconSvg} ${action.title}`;
    button.addEventListener('click', action.onClick);
    container.prepend(button);
  });
}

/** A Canvas `additionalActions` item, also used by the decorator's compatibility fallback. */
export function getOpenInPlaygroundAction(
  context: Pick<StoryContext, 'title' | 'name' | 'parameters'>,
  targetDocument: Document | undefined,
  warnMissingSource = true,
): { title: string; className: string; onClick: () => void } | undefined {
  const source = context.parameters.fullSource;

  if (
    context.parameters.playground?.disable ||
    context.parameters.fullSourceIsRunnable === false ||
    context.parameters.fullSourceUnsupportedImports?.length
  ) {
    return;
  }

  const allowedModules = getAllowedModules();
  if (source && allowedModules && getUnavailableImports(source, allowedModules).length > 0) {
    return;
  }

  if (!source) {
    if (warnMissingSource) {
      // eslint-disable-next-line no-console
      console.warn(
        `Playground Addon: Couldn't find source for story "${context.title} - ${context.name}". ` +
          'Is @fluentui/babel-preset-storybook-full-source (registered via @fluentui/react-storybook-addon-export-to-sandbox) installed?',
      );
    }
    return;
  }

  return {
    title: 'Open in Playground',
    className: `${PLAYGROUND_BUTTON_CLASS} ${PLAYGROUND_DOCS_ACTION_CLASS}`,
    onClick: () => {
      targetDocument?.defaultView?.open(
        createPlaygroundUrl(
          source,
          undefined,
          context.parameters.cssModuleSources?.cssModules,
          getPlaygroundTitle(context),
        ),
        '_blank',
        'noopener',
      );
    },
  };
}

/**
 * Names the example after the story, e.g. `Button: Appearance` for the "Appearance" story of `Components/Button`.
 */
export function getPlaygroundTitle(context: Pick<StoryContext, 'title' | 'name'>): string {
  const component = context.title?.split('/').pop()?.trim();

  return [component, context.name?.trim()].filter(Boolean).join(': ');
}

function getButtonContainers(context: StoryContext, targetDocument: Document) {
  const containers = new Set<HTMLElement>();
  const rootElements = [
    targetDocument.getElementById(`anchor--${context.id}`),
    targetDocument.getElementById(`anchor--primary--${context.id}`),
  ];

  return rootElements.flatMap(rootElement => {
    // The original Storybook "Show code" toggle. Sibling addons (export-to-sandbox) add their own buttons with the same
    // base class, so exclude them explicitly.
    const toggleSelector = `.docblock-code-toggle:not(.${PLAYGROUND_BUTTON_CLASS}):not(.with-code-sandbox-button):not(.with-open-in-new-tab-button)`;
    // Storybook 10 moved source actions out of .docs-story into a sibling row.
    const showCodeButton = rootElement?.querySelector(
      `.sbdocs-preview-actions ${toggleSelector}, .docs-story ${toggleSelector}`,
    );
    const container = showCodeButton?.parentElement;

    if (!showCodeButton || !container || containers.has(container)) {
      return [];
    }
    containers.add(container);

    container.querySelectorAll(`[${DECORATOR_BUTTON_ATTRIBUTE}]`).forEach(node => node.remove());
    // Canvas overrides own their React-rendered actions; never replace or move those buttons.
    if (container.querySelector(`.${PLAYGROUND_DOCS_ACTION_CLASS}`)) {
      return [];
    }

    const cssClasses = [...Array.from(showCodeButton.classList), PLAYGROUND_BUTTON_CLASS];

    return [{ container, cssClasses }];
  });
}
