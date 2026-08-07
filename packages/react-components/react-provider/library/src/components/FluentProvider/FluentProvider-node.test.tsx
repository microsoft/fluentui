/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { FluentProvider } from './FluentProvider';
// prettier 3's async `format` relies on dynamic import, which Jest's VM forbids without
// --experimental-vm-modules; the synchronous worker-thread wrapper avoids both problems.
import * as prettier from '@prettier/sync';
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
 *   "fui-FluentProvider1 fuicm-root group/fui-fluent-provider"
 * which fits on one line.
 *
 * Statics removal (DECISIONS.md D16.1): the leading bare `fui-FluentProvider` is gone from
 * the class attribute below. What remains is exactly the post-D16 contract — the runtime
 * `fui-FluentProvider<useId>` theme class (kept, because it hosts the `--token` custom
 * properties and portal-compat extracts it) followed by the `group/fui-fluent-provider`
 * marker, which is now the sole public identity CLASS. `fuicm-root` is stripped by the
 * CSS-Modules snapshot serializer. The `<style>` theme rule these tests actually assert on
 * is untouched.
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
      "<div dir="ltr" class="fui-FluentProvider1 group/fui-fluent-provider">
        <style id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --color-neutral-foreground-1: black;
            --colorNeutralBackground1: white;
            --color-neutral-background-1: white;
          }
        </style>
      </div>"
    `);
  });

  /*
   * Griffel → Tailwind + CSS Modules migration (D20, S-G): the CSP nonce used to reach the
   * SSR style element via Griffel's renderer context
   * (`RendererProvider` + `createDOMRenderer(undefined, { styleElementAttributes: { nonce } })`).
   * It is now the Fluent-owned `nonce` prop on FluentProvider; the rendered output below is
   * byte-identical to the pre-migration snapshot.
   */
  it('renders nonce with SSR style element', () => {
    const html = renderToStaticMarkup(<FluentProvider theme={testTheme} nonce="random" />);

    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div dir="ltr" class="fui-FluentProvider1 group/fui-fluent-provider">
        <style nonce="random" id="fui-FluentProvider1">
          .fui-FluentProvider1 {
            --colorNeutralForeground1: black;
            --color-neutral-foreground-1: black;
            --colorNeutralBackground1: white;
            --color-neutral-background-1: white;
          }
        </style>
      </div>"
    `);
  });

  it('nested providers inherit the nonce from the closest ancestor', () => {
    const html = renderToStaticMarkup(
      <FluentProvider theme={testTheme} nonce="random">
        <FluentProvider theme={testTheme} />
      </FluentProvider>,
    );

    // Both the outer provider's style element and the nested provider's own style element
    // must carry the root nonce — parity with the old app-root RendererProvider behavior.
    expect(html).toContain('<style nonce="random" id="fui-FluentProvider1">');
    expect(html).toContain('<style nonce="random" id="fui-FluentProvider2">');
  });

  it('a nested provider can override the inherited nonce', () => {
    const html = renderToStaticMarkup(
      <FluentProvider theme={testTheme} nonce="outer">
        <FluentProvider theme={testTheme} nonce="inner" />
      </FluentProvider>,
    );

    expect(html).toContain('<style nonce="outer" id="fui-FluentProvider1">');
    expect(html).toContain('<style nonce="inner" id="fui-FluentProvider2">');
  });

  it('does not leak the nonce onto the root element or emit it without the prop', () => {
    const html = renderToStaticMarkup(<FluentProvider theme={testTheme} nonce="random" />);
    expect(html).not.toContain('<div nonce');

    const withoutNonce = renderToStaticMarkup(<FluentProvider theme={testTheme} />);
    expect(withoutNonce).not.toContain('nonce');
  });
});
