import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';

import type { StoryContext } from '../types';
import { decodeCodeFromHash } from '../url';
import { PLAYGROUND_BUTTON_CLASS, withOpenInPlaygroundButton } from './withOpenInPlaygroundButton';

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
    expect(base).toBe('./playground.html');
    expect(decodeCodeFromHash(`#${hash}`)).toBe(fullSource);
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
