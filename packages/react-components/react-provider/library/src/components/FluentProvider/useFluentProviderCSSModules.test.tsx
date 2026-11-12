import * as React from 'react';
import { act, render } from '@testing-library/react';
import { createDOMRenderer } from '@griffel/core';
import type { CSSRulesByBucket } from '@griffel/core';
import { RendererProvider } from '@griffel/react';
import { FluentProvider } from './FluentProvider';
import type { CSSModulesRegistry } from './useFluentProviderCSSModules';

const CSS_MODULES_REGISTRY_KEY = Symbol.for('@fluentui/css-modules-registry');
type GlobalWithRegistry = { [CSS_MODULES_REGISTRY_KEY]?: CSSModulesRegistry };

function createTestRegistry(stylesheets: CSSRulesByBucket[]): CSSModulesRegistry & {
  register: (stylesheet: CSSRulesByBucket) => void;
} {
  const listeners = new Set<() => void>();
  return {
    stylesheets,
    subscribe: listener => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    register: stylesheet => {
      stylesheets.push(stylesheet);
      listeners.forEach(listener => listener());
    },
  };
}

/** Test rules (FluentProvider's own Griffel styles excluded) by stylesheet, in document order. */
const getRules = (targetDocument: Document) =>
  Array.from(targetDocument.head.querySelectorAll<HTMLStyleElement>('style[data-make-styles-bucket]'))
    .map(tag => {
      const rules = Array.from(tag.sheet!.cssRules, rule => rule.cssText).filter(rule => /^\.(a|b|app)\b/.test(rule));
      return `${tag.dataset.makeStylesBucket}${tag.dataset.priority} ${rules.join(',')}`;
    })
    .filter(sheet => !sheet.endsWith(' '));

describe('useFluentProviderCSSModules', () => {
  afterEach(() => {
    delete (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY];
    document.head.innerHTML = '';
  });

  it('does nothing without a registry', () => {
    render(
      <RendererProvider renderer={createDOMRenderer(document)}>
        <FluentProvider theme={{}} />
      </RendererProvider>,
    );

    expect(getRules(document)).toEqual([]);
  });

  it('inserts registered stylesheets with the Griffel renderer, ordered by bucket and priority', () => {
    (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY] = createTestRegistry([
      { h: [['.a:hover { color: red; }', { p: -2.5 }]], d: [['.a { color: blue; }', { p: -2.5 }]] },
    ]);
    const renderer = createDOMRenderer(document);
    renderer.insertCSSRules({ d: ['.app { color: green; }'] });

    render(
      <RendererProvider renderer={renderer}>
        <FluentProvider theme={{}} />
      </RendererProvider>,
    );

    expect(getRules(document)).toEqual([
      'd-2.5 .a {color: blue;}',
      'd0 .app {color: green;}',
      'h-2.5 .a:hover {color: red;}',
    ]);
  });

  it('inserts stylesheets registered later', () => {
    const registry = createTestRegistry([{ d: [['.a { color: blue; }', { p: -2.5 }]] }]);
    (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY] = registry;

    render(
      <RendererProvider renderer={createDOMRenderer(document)}>
        <FluentProvider theme={{}} />
      </RendererProvider>,
    );
    act(() => registry.register({ d: [['.b { color: red; }', { p: -2.5 }]] }));

    expect(getRules(document)).toEqual(['d-2.5 .a {color: blue;},.b {color: red;}']);
  });

  it('inserts registered stylesheets into the target document of the renderer', () => {
    (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY] = createTestRegistry([
      { d: [['.a { color: blue; }', { p: -2.5 }]] },
    ]);
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const targetDocument = iframe.contentDocument!;

    const { unmount } = render(
      <RendererProvider renderer={createDOMRenderer(targetDocument)} targetDocument={targetDocument}>
        <FluentProvider targetDocument={targetDocument} theme={{}} />
      </RendererProvider>,
    );

    expect(getRules(document)).toEqual([]);
    expect(getRules(targetDocument)).toEqual(['d-2.5 .a {color: blue;}']);
    unmount();
    iframe.remove();
  });
});
