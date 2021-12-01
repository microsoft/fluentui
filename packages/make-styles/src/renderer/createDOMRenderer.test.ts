import { CSSRulesByBucket } from '../types';
import { createDOMRenderer } from './createDOMRenderer';
import { makeStylesRendererSerializer } from '../common/snapshotSerializers';

expect.addSnapshotSerializer(makeStylesRendererSerializer);

describe('createDOMRenderer', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('should apply filter for css rules for multiple buckets', () => {
    const mediaQueryFilter = jest.fn().mockImplementation(cssRule => {
      return !cssRule.startsWith('@media');
    });
    const renderer = createDOMRenderer(document, { unstable_filterCSSRule: mediaQueryFilter });

    const cssRules: CSSRulesByBucket = {
      t: ['@media only screen and (max-width: 600px) { .bar: { background-color: red; } }'],
      d: ['.foo { background-color: red; }'],
    };

    renderer.insertCSSRules(cssRules);

    expect(renderer).toMatchInlineSnapshot(`
      .foo {
        background-color: red;
      }
    `);
  });

  it('should apply filter for css rules within single bucket', () => {
    const mediaQueryFilter = jest.fn().mockImplementation(cssRule => {
      return !cssRule.startsWith('@media');
    });
    const renderer = createDOMRenderer(document, { unstable_filterCSSRule: mediaQueryFilter });

    const cssRules: CSSRulesByBucket = {
      t: [
        '@media only screen and (max-width: 600px) { .bar: { background-color: red; } }',
        '.foo { background-color: red; }',
      ],
    };

    renderer.insertCSSRules(cssRules);
    expect(renderer).toMatchInlineSnapshot(`
      .foo {
        background-color: red;
      }
    `);
  });
});
