/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { SSRProvider } from '@fluentui/react-utilities';
import { FluentProvider } from './FluentProvider';
import * as prettier from 'prettier';
import { createDOMRenderer } from '@griffel/core';
import { RendererProvider } from '@griffel/react';

const parseHTMLString = (html: string) => {
  return prettier.format(html, { parser: 'html' });
};

describe('FluentProvider (node)', () => {
  const testTheme = {
    colorNeutralForeground1: 'black',
    colorNeutralBackground1: 'white',
  };
  it('should render CSS variables as inline style when wrapped with SSRPRovider', () => {
    const html = ReactDOM.renderToStaticMarkup(
      <SSRProvider>
        <FluentProvider theme={testTheme} />
      </SSRProvider>,
    );

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1 "
      >
        <style data-fui-theme="" id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --colorNeutralBackground1: white;
          }
        </style>
      </div>"
    `);
  });

  it('should not render CSS variables as inline style when not wrapped with SSRPRovider', () => {
    const html = ReactDOM.renderToStaticMarkup(<FluentProvider theme={testTheme} />);

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1 "
      >
        <style data-fui-theme="" id="fui-FluentProvider1">
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

    const html = ReactDOM.renderToStaticMarkup(
      <SSRProvider>
        <RendererProvider renderer={renderer}>
          <FluentProvider theme={testTheme} />
        </RendererProvider>
      </SSRProvider>,
    );

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1 "
      >
        <style data-fui-theme="" id="fui-FluentProvider1" nonce="random">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --colorNeutralBackground1: white;
          }
        </style>
      </div>"
    `);
  });
});
