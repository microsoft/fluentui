import { resolveStaticStyleRules } from './resolveStaticStyleRules';
import { makeStylesRulesSerializer } from './utils/test/snapshotSerializer';

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
});
