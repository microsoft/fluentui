/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { FluentProvider } from './FluentProvider';
import * as prettier from 'prettier';
import { createDOMRenderer } from '@griffel/core';
import { RendererProvider } from '@griffel/react';
import { PartialTheme } from '@fluentui/react-theme';

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
    const html = ReactDOM.renderToStaticMarkup(<FluentProvider theme={testTheme} />);

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

    const html = ReactDOM.renderToStaticMarkup(
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
});
