import { getStyleSheetForBucket } from './getStyleSheetForBucket';
import { createDOMRenderer } from './createDOMRenderer';

function createFakeDocument(): Document {
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'head'));

  return doc;
}

describe('getStyleSheetForBucket', () => {
  it('sets "data-make-styles-bucket" attribute', () => {
    const target = createFakeDocument();
    const renderer = createDOMRenderer();

    getStyleSheetForBucket('', target, renderer);
    getStyleSheetForBucket('h', target, renderer);

    expect(target.head.innerHTML).toMatchInlineSnapshot(
      `"<style data-make-styles-bucket=\\"default\\"></style><style data-make-styles-bucket=\\"h\\"></style>"`,
    );
  });
});
