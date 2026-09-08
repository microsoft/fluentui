import { renderStatic } from './server';
import { mergeCssSets } from './mergeStyleSets';
import { keyframes } from './keyframes';
import { Stylesheet } from './Stylesheet';

describe('staticRender', () => {
  it('can render content', () => {
    const { html, css } = renderStatic(() => {
      const classNames: { root: string } = mergeCssSets([
        {
          root: {
            background: 'red',
          },
        },
      ]);

      return `<div class="${classNames.root}">Hello!</div>`;
    });

    expect(html).toEqual(`<div class="root-0">Hello!</div>`);
    expect(css).toEqual(`.root-0{background:red;}`);
  });

  it('can namespace things', () => {
    const { html, css } = renderStatic(() => {
      const classNames: { root: string } = mergeCssSets([
        {
          root: {
            background: 'red',
          },
        },
      ]);

      return `<div class="${classNames.root}">Hello!</div>`;
    }, 'test');

    expect(html).toEqual(`<div class="test-root-0">Hello!</div>`);
    expect(css).toEqual(`.test-root-0{background:red;}`);
  });

  it('does not emit a style element terminator from an untrusted style value', () => {
    const { css } = renderStatic(() => {
      const classNames: { root: string } = mergeCssSets([
        {
          root: {
            background: 'red;}</style><script>alert(document.cookie)</script><style>.x{color:red',
          },
        },
      ]);

      return `<div class="${classNames.root}">Hello!</div>`;
    });

    expect(css).not.toContain('</style');
    expect(css).not.toContain('<script');
  });

  it('contains style element terminators in structural CSS positions', () => {
    const { css } = renderStatic(() => {
      mergeCssSets([
        {
          root: {
            selectors: {
              '&</STYLE>.selector-sentinel': { color: 'red' },
            },
            'color</style>-property-sentinel': 'red',
            '--custom</StYlE>-property-sentinel': 'value',
          },
        },
      ]);
      keyframes({
        '50%</sTyLe>.keyframe-sentinel': { opacity: 0.5 },
      });

      return '';
    });

    expect(css).not.toMatch(/<\/style/i);
    expect(css).toContain('\\3C /STYLE');
    expect(css).toContain('\\3C /style');
    expect(css).toContain('\\3C /StYlE');
    expect(css).toContain('\\3C /sTyLe');
    expect(css).toContain('selector-sentinel');
    expect(css).toContain('property-sentinel');
    expect(css).toContain('keyframe-sentinel');
  });

  it('preserves valid structural CSS syntax', () => {
    const { css } = renderStatic(() => {
      mergeCssSets([
        {
          root: {
            '--custom-property': 'value',
            selectors: {
              '& > .child': { color: 'red' },
              '@media (width < 1000px)': { color: 'blue' },
            },
          },
        },
      ]);
      keyframes({
        from: { opacity: 0 },
        '50%': { opacity: 0.5 },
        to: { opacity: 1 },
      });

      return '';
    });

    expect(css).toContain(' > .child');
    expect(css).toContain('@media (width < 1000px)');
    expect(css).toContain('--custom-property:value;');
    expect(css).toContain('from{opacity:0;}50%{opacity:0.5;}to{opacity:1;}');
  });

  it('preserves odd and even backslash escape parity in raw server-rendered rules', () => {
    const stylesheet = Stylesheet.getInstance();
    const backslash = '\\';

    stylesheet.insertRule(`.odd{content:"${backslash}</StYlE>"}`);
    stylesheet.insertRule(`.even{content:"${backslash}${backslash}</style>"}`);

    const css = stylesheet.getRules();

    expect(css).not.toMatch(/<\/style/i);
    expect(css).toContain(`.odd{content:"${backslash}3C /StYlE>"}`);
    expect(css).toContain(`.even{content:"${backslash}${backslash}${backslash}3C /style>"}`);
  });
});
