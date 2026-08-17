/*
 * @jest-environment node
 */

import { IdPrefixProvider } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { FluentProvider } from './FluentProvider';

const hostilePrefix = 'msrc</style><script data-test="inert"></script><style>';

/**
 * A hostile id prefix must not be able to break out of the SSR markup.
 *
 * Upstream escapes the prefix where it is interpolated into a theme `<style>` selector
 * (microsoft/fluentui#36464) and asserts the escaped form is present. This branch does not
 * interpolate the prefix into CSS at all: theming Phase 2b removed the runtime theme
 * `<style>` element, so there is no selector to inject into and nothing to escape. The
 * property asserted here is the stronger one — neither a style element nor a script reaches
 * the output, whatever the prefix contains.
 */
function expectSafeStyleRule(html: string): void {
  expect(html).not.toContain('</style><script');
  expect(html).not.toContain('<script');
  expect(html).not.toContain('<style');
}

describe('FluentProvider prefix SSR', () => {
  it('renders an IdPrefixProvider value inertly', () => {
    const html = renderToStaticMarkup(
      <IdPrefixProvider value={hostilePrefix}>
        <FluentProvider />
      </IdPrefixProvider>,
    );

    expectSafeStyleRule(html);
  });

  it('renders React identifierPrefix inertly', () => {
    const html = renderToString(<FluentProvider />, {
      identifierPrefix: hostilePrefix,
    });

    expectSafeStyleRule(html);
  });
});
