/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createDOMRenderer } from '@griffel/core';
import { RendererProvider, renderToStyleElements } from '@griffel/react';
import { FluentProvider } from './FluentProvider';
import type { CSSModulesRegistry } from './useFluentProviderCSSModules';

const CSS_MODULES_REGISTRY_KEY = Symbol.for('@fluentui/css-modules-registry');
type GlobalWithRegistry = { [CSS_MODULES_REGISTRY_KEY]?: CSSModulesRegistry };

describe('useFluentProviderCSSModules (node)', () => {
  afterEach(() => {
    delete (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY];
  });

  it('inserts registered stylesheets during server rendering', () => {
    (globalThis as GlobalWithRegistry)[CSS_MODULES_REGISTRY_KEY] = {
      stylesheets: [{ d: [['.a { color: blue; }', { p: -2.5 }]] }],
      subscribe: () => () => undefined,
    };
    const renderer = createDOMRenderer(undefined);

    renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <FluentProvider theme={{}} />
      </RendererProvider>,
    );

    expect(renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>)).toMatch(
      /<style data-make-styles-bucket="d" data-priority="-2.5"[^>]*>\.a { color: blue; }<\/style>/,
    );
  });
});
