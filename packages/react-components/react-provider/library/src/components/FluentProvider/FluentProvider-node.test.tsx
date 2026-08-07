/*
 * @jest-environment node
 */

// 👆 this is intentionally to test in SSR like environment

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { webDarkThemeClassName } from '@fluentui/react-theme';
import { FluentProvider } from './FluentProvider';
// prettier 3's async `format` relies on dynamic import, which Jest's VM forbids without
// --experimental-vm-modules; the synchronous worker-thread wrapper avoids both problems.
import * as prettier from '@prettier/sync';

const parseHTMLString = (html: string) => {
  return prettier.format(html, { parser: 'html' });
};

/*
 * Theming Phase 2b: FluentProvider injects NO styles at all — the SSR-rendered theme
 * `<style>` element (and its CSP `nonce` plumbing, D20.1) is gone with the runtime theme
 * tag. A theme is a static CSS class passed via `themeClassName`; SSR output is just the
 * root `<div>` carrying it. `fuicm-root` (the css-modules class) is stripped by the
 * CSS-Modules snapshot serializer; `group/fui-fluent-provider` is the identity marker
 * (D16.1).
 */

describe('FluentProvider (node)', () => {
  it('renders no style element — the theme class is the entire theming surface', () => {
    const html = renderToStaticMarkup(<FluentProvider themeClassName={webDarkThemeClassName} />);

    expect(html).not.toContain('<style');
    expect(parseHTMLString(html)).toMatchInlineSnapshot(`
      "<div
        dir="ltr"
        class="group/fui-fluent-provider fui-theme-web-dark"
      ></div>"
    `);
  });

  it('renders no theme class when none is passed (web-light :root defaults apply)', () => {
    const html = renderToStaticMarkup(<FluentProvider />);

    expect(html).not.toContain('<style');
    expect(html).not.toContain('fui-theme-');
  });

  it('nested providers inherit the theme class from the closest ancestor', () => {
    const html = renderToStaticMarkup(
      <FluentProvider themeClassName={webDarkThemeClassName}>
        <FluentProvider />
      </FluentProvider>,
    );

    // Both roots carry the class: the nested provider resolves its themeClassName from
    // the inheritance context, so portals opened under it keep the ancestor theme.
    expect(html.match(/fui-theme-web-dark/g)).toHaveLength(2);
  });

  it('a nested provider can override the inherited theme class', () => {
    const html = renderToStaticMarkup(
      <FluentProvider themeClassName={webDarkThemeClassName}>
        <FluentProvider themeClassName="my-custom-theme" />
      </FluentProvider>,
    );

    expect(html.match(/fui-theme-web-dark/g)).toHaveLength(1);
    expect(html.match(/my-custom-theme/g)).toHaveLength(1);
  });
});
