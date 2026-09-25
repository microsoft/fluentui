import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import type { StoryContext } from '../types';
import { decodeCodeFromHash, decodePlaygroundStateFromHash } from '../url';
import {
  PLAYGROUND_BUTTON_CLASS,
  getPlaygroundTitle,
  getUnavailableImports,
  withOpenInPlaygroundButton,
} from './withOpenInPlaygroundButton';

type GlobalWithAllowedModules = typeof globalThis & { __FLUENTUI_PLAYGROUND_ALLOWED_MODULES__?: string[] };

const fullSource = `import * as React from 'react';
import { Button } from '@fluentui/react-components';

export const Default = () => <Button>Hello</Button>;
`;

function createContext(overrides: Partial<StoryContext> = {}): StoryContext {
  return {
    id: 'components-button--default',
    title: 'Components/Button',
    name: 'Default',
    viewMode: 'docs',
    parameters: { fullSource },
    ...overrides,
  } as unknown as StoryContext;
}

function renderDocsPage(storyId: string) {
  document.body.innerHTML = `
    <div id="anchor--${storyId}">
      <div class="docs-story">
        <div class="story-wrapper"></div>
        <div class="toolbar">
          <button class="docblock-code-toggle docblock-code-toggle--expanded">Show code</button>
        </div>
      </div>
    </div>
  `;
}

describe('withOpenInPlaygroundButton', () => {
  const storyFn = jest.fn((): JSXElement => React.createElement('div'));
  let openSpy: jest.SpyInstance;

  beforeEach(() => {
    storyFn.mockClear();
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    openSpy.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders the original story', () => {
    const context = createContext();
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    expect(storyFn).toHaveBeenCalledWith(context);
  });

  it('adds the button next to "Show code" with matching classes', () => {
    const context = createContext();
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    const buttons = document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`);
    expect(buttons).toHaveLength(1);

    const button = buttons[0];
    expect(button.textContent).toContain('Open in Playground');
    expect(button.classList.contains('docblock-code-toggle')).toBe(true);
    expect(button.getAttribute('type')).toBe('button');
    // prepended before the original toggle
    expect(button.nextElementSibling?.textContent).toBe('Show code');
  });

  it('supports the ">=10" anchor id format', () => {
    const context = createContext();
    renderDocsPage(`primary--${context.id}`);

    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(1);
  });

  it('does not duplicate the button on re-render', () => {
    const context = createContext();
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);
    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(1);
  });

  it('opens the playground with the story source encoded in the hash', () => {
    const context = createContext();
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);
    (document.querySelector(`.${PLAYGROUND_BUTTON_CLASS}`) as HTMLButtonElement).click();

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(target).toBe('_blank');
    expect(features).toBe('noopener');

    const [base, hash] = (url as string).split('#');
    expect(base).toBe('./playground/app/playground.html');
    expect(decodeCodeFromHash(`#${hash}`)).toBe(fullSource);
    expect(decodePlaygroundStateFromHash(`#${hash}`)).toEqual({
      code: fullSource,
      cssModules: [],
      title: 'Button: Default',
    });
  });

  it('encodes story CSS modules in the playground URL', () => {
    const cssModules = [{ name: 'button.module.css', source: '.root { color: red; }' }];
    const context = createContext({
      parameters: { fullSource, cssModuleSources: { cssModules } },
    });
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);
    (document.querySelector(`.${PLAYGROUND_BUTTON_CLASS}`) as HTMLButtonElement).click();

    const url = openSpy.mock.calls[0][0] as string;
    expect(decodePlaygroundStateFromHash(`#${url.split('#')[1]}`)).toEqual({
      code: fullSource,
      cssModules,
      title: 'Button: Default',
    });
  });

  it('does nothing outside of docs mode', () => {
    const context = createContext({ viewMode: 'story' });
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(0);
    expect(storyFn).toHaveBeenCalledTimes(1);
  });

  it('does nothing when disabled via parameters', () => {
    const context = createContext({ parameters: { fullSource, playground: { disable: true } } });
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(0);
  });

  it('does nothing when the generated source depends on unsupported relative imports', () => {
    const context = createContext({
      parameters: { fullSource, fullSourceUnsupportedImports: ['./utils'] },
    });
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(0);
  });

  it('does nothing when the story imports packages that are not configured for the playground', () => {
    const globalScope = globalThis as GlobalWithAllowedModules;
    globalScope.__FLUENTUI_PLAYGROUND_ALLOWED_MODULES__ = ['react', '@fluentui/react-components'];
    try {
      const context = createContext({
        parameters: { fullSource: `${fullSource}import { useForm } from 'react-hook-form';\n` },
      });
      renderDocsPage(context.id);
      withOpenInPlaygroundButton(storyFn, context);
      expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(0);

      const supported = createContext({ id: 'components-button--supported' });
      renderDocsPage(supported.id);
      withOpenInPlaygroundButton(storyFn, supported);
      expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(1);
    } finally {
      delete globalScope.__FLUENTUI_PLAYGROUND_ALLOWED_MODULES__;
    }
  });

  it('warns and does nothing when story source is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const context = createContext({ parameters: {} });
    renderDocsPage(context.id);

    withOpenInPlaygroundButton(storyFn, context);

    expect(document.querySelectorAll(`.${PLAYGROUND_BUTTON_CLASS}`)).toHaveLength(0);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toContain('Components/Button - Default');

    warnSpy.mockRestore();
  });

  it('ignores buttons added by sibling addons when looking for "Show code"', () => {
    const context = createContext();
    document.body.innerHTML = `
      <div id="anchor--${context.id}">
        <div class="docs-story">
          <div class="toolbar">
            <button class="docblock-code-toggle with-code-sandbox-button">Open in CodeSandbox</button>
            <button class="docblock-code-toggle">Show code</button>
          </div>
        </div>
      </div>
    `;

    withOpenInPlaygroundButton(storyFn, context);

    const toolbar = document.querySelector('.toolbar') as HTMLElement;
    expect(toolbar.children).toHaveLength(3);
    expect(toolbar.children[0].classList.contains(PLAYGROUND_BUTTON_CLASS)).toBe(true);
    // classes are copied from the real "Show code" button, not the sandbox one
    expect(toolbar.children[0].classList.contains('with-code-sandbox-button')).toBe(false);
  });
});

describe('getPlaygroundTitle', () => {
  it('names the example after the component and story', () => {
    expect(getPlaygroundTitle({ title: 'Components/Button/Button', name: 'Appearance' })).toBe('Button: Appearance');
    expect(getPlaygroundTitle({ title: 'Concepts', name: '' })).toBe('Concepts');
    expect(getPlaygroundTitle({ title: '', name: 'Default' })).toBe('Default');
  });
});

describe('getUnavailableImports', () => {
  const allowed = ['react', 'react-dom', '@fluentui/react-components', '@fluentui/react-icons'];

  it('reports value imports, re-exports and requires of packages that are not allowed', () => {
    const source = `import * as React from 'react';
import Default, {
  Button,
  type ButtonProps,
} from '@fluentui/react-components';
import 'side-effect-package';
import { useForm } from "react-hook-form";
export { FixedSizeList } from 'react-window';
const legacy = require('@fluentui/react');
`;

    expect(getUnavailableImports(source, allowed)).toEqual([
      'side-effect-package',
      'react-hook-form',
      'react-window',
      '@fluentui/react',
    ]);
  });

  it('ignores type-only imports, relative imports and allowed subpaths only when configured', () => {
    const source = `import type { Meta } from '@storybook/react-webpack5';
import styles from './Button.module.css';
import { helper } from './helper';
import { Icon } from '@fluentui/react-icons/lib/icons';
`;

    expect(getUnavailableImports(source, allowed)).toEqual(['@fluentui/react-icons/lib/icons']);
  });

  it('ignores statements that only look like imports', () => {
    const source = `export const Default = () => <Button>import</Button>;
export default { title: 'from' };
const text = 'import x from';
myrequire('left-pad');
export * from 'react-window';
import typeface from 'typeface-lib';
`;

    expect(getUnavailableImports(source, allowed)).toEqual(['react-window', 'typeface-lib']);
  });

  it('scans pathological input in linear time', () => {
    const source = `\timport ${'\t'.repeat(50_000)}${' import'.repeat(50_000)}`;
    const start = Date.now();

    expect(getUnavailableImports(source, allowed)).toEqual([]);
    expect(Date.now() - start).toBeLessThan(1000);
  });
});
