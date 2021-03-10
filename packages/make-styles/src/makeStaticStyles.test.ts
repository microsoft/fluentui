import { getCSSRules } from '@fluentui/test-utilities';
import { createDOMRenderer, MakeStylesDOMRenderer, resetDOMRenderer } from './renderer/createDOMRenderer';
import { makeStaticStyles } from './makeStaticStyles';
import { cssRulesSerializer, makeStylesRulesSerializer } from './utils/test/snapshotSerializer';
import { makeStylesCompat } from './makeStyles';

expect.addSnapshotSerializer(cssRulesSerializer);
expect.addSnapshotSerializer(makeStylesRulesSerializer);

describe('makeStaticStyles', () => {
  let renderer: MakeStylesDOMRenderer;
  beforeEach(() => {
    renderer = createDOMRenderer();
  });

  afterEach(() => {
    resetDOMRenderer();
  });

  it('handles static styles', () => {
    const useStyles = makeStaticStyles({
      body: {
        background: 'blue',
        transition: 'all 4s ease',
      },
      '.foo': {
        background: 'yellow',
        marginLeft: '5px',
      },
    });

    useStyles({ renderer });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      body {
        background: blue;
        -webkit-transition: all 4s ease;
        transition: all 4s ease;
      }
      .foo {
        background: yellow;
        margin-left: 5px;
      }
    `);
  });

  it('handles styles array', () => {
    const useStyles = makeStaticStyles([
      {
        '@font-face': {
          fontFamily: 'Open Sans',
          src: `url("/fonts/OpenSans-Regular-webfont.woff") format("woff")`,
        },
      },
      {
        '@font-face': {
          fontFamily: 'My Font',
          src: `url(my-font.woff)`,
        },
      },
    ]);

    useStyles({ renderer });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      @font-face {
        font-family: Open Sans;
        src: url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
      }
      @font-face {
        font-family: My Font;
        src: url(my-font.woff);
      }
    `);
  });

  it('handles css string', () => {
    const useStyles = makeStaticStyles('body {background: red;} div {color: green;}');

    useStyles({ renderer });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      body {
        background: red;
      }
      div {
        color: green;
      }
    `);
  });

  it('handles caching to avoid duplicated styles', () => {
    const useStyles = makeStaticStyles({
      body: {
        background: 'blue',
      },
    });

    const useStyles2 = makeStaticStyles({
      body: {
        background: 'blue',
      },
    });

    useStyles({ renderer });
    useStyles({ renderer });
    useStyles2({ renderer });

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      body {
        background: blue;
      }
    `);
  });

  it('can be used with makeStyles', () => {
    const useStaticStyles = makeStaticStyles({
      '@font-face': {
        fontFamily: 'Open Sans',
        src: `url("/fonts/OpenSans-Regular-webfont.woff") format("woff")`,
      },
    });

    const useStyles = makeStylesCompat([
      [
        null,
        {
          fontFamily: 'Open Sans',
          fontSize: '16px',
        },
      ],
    ]);

    useStaticStyles({ renderer });
    expect(useStyles({}, { renderer, tokens: {} })).toBe('__xgtdzt0 fy9yzz70 f4ybsrx0');

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      @font-face {
        font-family: Open Sans;
        src: url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
      }
      .fy9yzz70 {
        font-family: Open Sans;
      }
      .f4ybsrx0 {
        font-size: 16px;
      }
    `);
  });
});
