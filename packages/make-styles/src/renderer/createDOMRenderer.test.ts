import { CSSRulesByBucket } from '../types';
import { createDOMRenderer } from './createDOMRenderer';
import { makeStylesRendererSerializer } from '../common/snapshotSerializers';

function createFakeDocument(): Document {
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'head'));

  return doc;
}

expect.addSnapshotSerializer(makeStylesRendererSerializer);

describe('createDOMRenderer', () => {
  it('should apply filter for css rules for multiple buckets', () => {
    const targetDocument = createFakeDocument();
    const mediaQueryFilter = jest.fn().mockImplementation(cssRule => {
      return !cssRule.startsWith('@media');
    });
    const renderer = createDOMRenderer(targetDocument, { filterCSSRule: mediaQueryFilter });

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
    const targetDocument = createFakeDocument();
    const mediaQueryFilter = jest.fn().mockImplementation(cssRule => {
      return !cssRule.startsWith('@media');
    });
    const renderer = createDOMRenderer(targetDocument, { filterCSSRule: mediaQueryFilter });

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
