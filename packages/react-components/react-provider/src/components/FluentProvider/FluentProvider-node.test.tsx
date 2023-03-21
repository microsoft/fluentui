/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { SSRProvider } from '@fluentui/react-utilities';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from './FluentProvider';
import * as prettier from 'prettier';

jest.mock('@fluentui/react-theme', () => ({
  ...jest.requireActual('@fluentui/react-theme'),
  webLightTheme: {
    colorNeutralForeground1: 'black',
    colorNeutralBackground1: 'white',
  },
}));

const parseHTMLString = (html: string) => {
  return prettier.format(html, { parser: 'html' });
};

describe('FluentProvider (node)', () => {
  it('should render CSS variables as inline style when wrapped with SSRPRovider', () => {
    const html = ReactDOM.renderToStaticMarkup(
      <SSRProvider>
        <FluentProvider theme={webLightTheme} />
      </SSRProvider>,
    );

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1 "
      >
        <style id="fui-FluentProvider1" class="fui-FluentProvider__serverStyle">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --colorNeutralBackground1: white;
          }
        </style>
      </div>"
    `);
  });

  it('should not render CSS variables as inline style when not wrapped with SSRPRovider', () => {
    const html = ReactDOM.renderToStaticMarkup(<FluentProvider theme={webLightTheme} />);

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="fui-FluentProvider fui-FluentProvider1 "
      ></div>"
    `);
  });
});
