/*
 * @jest-environment node
 */

import { IdPrefixProvider } from '@fluentui/react-utilities';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { FluentProvider } from './FluentProvider';

const hostilePrefix = 'msrc</style><script data-test="inert"></script><style>';

function expectSafeStyleRule(html: string): void {
  expect(html).not.toContain('</style><script');
  expect(html).not.toContain('<script');
  expect(html).toContain('\\3C /style\\3E ');
  expect(html).toContain('\\3C script data-test="inert"\\3E ');
}

describe('FluentProvider prefix SSR', () => {
  it('escapes an IdPrefixProvider value in the theme style selector', () => {
    const html = renderToStaticMarkup(
      <IdPrefixProvider value={hostilePrefix}>
        <FluentProvider theme={{ colorBrandBackground: 'red' }} />
      </IdPrefixProvider>,
    );

    expectSafeStyleRule(html);
  });

  it('escapes React identifierPrefix in the theme style selector', () => {
    const html = renderToString(<FluentProvider theme={{ colorBrandBackground: 'red' }} />, {
      identifierPrefix: hostilePrefix,
    });

    expectSafeStyleRule(html);
  });
});
