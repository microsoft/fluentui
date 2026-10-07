/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { FluentProvider } from './FluentProvider';
import * as prettier from 'prettier';
import { createDOMRenderer } from '@griffel/core';
import { RendererProvider } from '@griffel/react';
import type { PartialTheme } from '@fluentui/react-theme';

jest.mock('@fluentui/react-utilities', () => ({
  ...jest.requireActual('@fluentui/react-utilities'),
  ...jest.requireActual('../../testing/createUseIdMock').createUseIdMock(),
}));

const parseHTMLString = (html: string) => {
  return prettier.format(html, { parser: 'html' });
};

describe('FluentProvider (node)', () => {
  const testTheme: PartialTheme = {
    colorNeutralForeground1: 'black',
    colorNeutralBackground1: 'white',
  };

  afterEach(() => {
    resetIdsForTests();
  });

  it('should render CSS variables as inline style', () => {
    const html = renderToStaticMarkup(<FluentProvider theme={testTheme} />);

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1"
      >
        <style id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --colorNeutralBackground1: white;
          }
        </style>
      </div>"
    `);
  });

  it('renders nonce with SSR style element', () => {
    const nonce = 'random';
    const renderer = createDOMRenderer(undefined, {
      styleElementAttributes: { nonce },
    });

    const html = renderToStaticMarkup(
      <RendererProvider renderer={renderer}>
        <FluentProvider theme={testTheme} />
      </RendererProvider>,
    );

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1"
      >
        <style nonce="random" id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --colorNeutralBackground1: white;
          }
        </style>
      </div>"
    `);
  });

  it('contains theme entries in the server style element', () => {
    const theme = {
      customToken: 'url(\\x")',
      validToken: 'green',
    } as unknown as PartialTheme;

    const html = renderToStaticMarkup(<FluentProvider theme={theme} />);

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1"
      >
        <style id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --customToken: url(\\x\\22);
            --validToken: green;
          }
        </style>
      </div>"
    `);
    expect(html.match(/<style/g)).toHaveLength(1);
  });

  it.each([
    { value: '<url(a{)', containedValue: '\\3C url(a{})' },
    { value: '>url(a{)', containedValue: '\\3E url(a{})' },
    { value: '<url(/*)', containedValue: '\\3C url(/*)*/)' },
  ])('contains final escaped syntax in server style text for $value', ({ value, containedValue }) => {
    const theme: PartialTheme & { customToken: string } = {
      customToken: value,
      colorBrandBackground: 'blue',
    };
    const html = renderToStaticMarkup(<FluentProvider theme={theme} />);

    expect(html).toContain(`--customToken: ${containedValue}; --colorBrandBackground: blue;`);
    expect(html.match(/<style/g)).toHaveLength(1);
  });

  it('normalizes NUL characters in server-rendered theme values', () => {
    const html = renderToStaticMarkup(
      <FluentProvider theme={{ fontFamilyBase: '"font\0family"', colorBrandBackground: 'blue' }} />,
    );

    expect(html).toContain('--fontFamilyBase: "font\uFFFDfamily"; --colorBrandBackground: blue;');
    expect(html).not.toContain('\0');
  });

  it.each([
    { value: ';url(a{)', containedValue: '\\3B  url(a{)' },
    { value: '}url(a[)', containedValue: '\\7D  url(a[)' },
    { value: 'red;url(a{)', containedValue: 'red\\3B  url(a{)' },
    { value: String.raw`;\75rl(a{)`, containedValue: String.raw`\3B  \75rl(a{)` },
  ])('preserves repaired delimiter boundaries in server-rendered values for $value', ({ value, containedValue }) => {
    const theme: PartialTheme & { customToken: string } = {
      customToken: value,
      colorBrandBackground: 'blue',
    };
    const html = renderToStaticMarkup(<FluentProvider theme={theme} />);

    expect(html).toContain(`--customToken: ${containedValue}; --colorBrandBackground: blue;`);
    expect(html.match(/<style/g)).toHaveLength(1);
  });
});
