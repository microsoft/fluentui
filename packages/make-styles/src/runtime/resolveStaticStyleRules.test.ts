import { makeStylesRulesSerializer } from '../utils/test/snapshotSerializer';
import { resolveStaticStyleRules } from './resolveStaticStyleRules';

expect.addSnapshotSerializer(makeStylesRulesSerializer);

describe('resolveStaticStyleRules', () => {
  it('handles font-face', () => {
    expect(
      resolveStaticStyleRules({
        '@font-face': {
          fontFamily: 'Open Sans',
          src: `url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
                 url("/fonts/OpenSans-Regular-webfont.woff") format("woff")`,
        },
      }),
    ).toMatchInlineSnapshot(`
      @font-face {
        font-family: Open Sans;
        src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
          url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
      }
    `);
  });

  it('handles static css', () => {
    expect(
      resolveStaticStyleRules({
        body: {
          background: 'blue',
        },
        '.foo': {
          background: 'yellow',
          marginLeft: '5px',
        },
      }),
    ).toMatchInlineSnapshot(`
        body {
          background: blue;
        }
        .foo {
          background: yellow;
          margin-left: 5px;
        }
      `);
  });

  it('handles css string', () => {
    expect(resolveStaticStyleRules('body {background: red;} div {color: green;}')).toMatchInlineSnapshot(`
      body {
        background: red;
      }
      div {
        color: green;
      }
    `);
  });
});
