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

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * Both inline snapshots below now keep the opening `<div …>` on ONE line where they
 * previously wrapped each attribute onto its own. That is a prettier line-width artifact,
 * not a DOM change: prettier formats the RAW markup, before any snapshot serializer runs.
 * The raw class attribute used to be
 *   "fui-FluentProvider fui-FluentProvider1 ___<seq> f19n0e5 fxugw4r f1o700av fk6fouc …"
 * (Griffel's atomics, ~110 chars → over printWidth → wrapped), and the serializer then
 * stripped the atomics out of the already-wrapped output. It is now
 *   "fui-FluentProvider fui-FluentProvider1 fuicm-root"
 * which fits on one line. The serialized DOM — `fui-FluentProvider fui-FluentProvider1` —
 * is byte-identical, as is the `<style>` theme rule this test actually asserts on.
 */

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
      "<div dir="ltr" class="fui-FluentProvider fui-FluentProvider1">
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
      "<div dir="ltr" class="fui-FluentProvider fui-FluentProvider1">
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
