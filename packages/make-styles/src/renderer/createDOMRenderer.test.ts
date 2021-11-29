import { CSSRulesByBucket } from '../types';
import { createDOMRenderer } from './createDOMRenderer';

describe('createDOMRenderer', () => {
  beforeEach(() => {
    // clean up style elements
    document.querySelectorAll('style').forEach(el => el.remove());
  });

  it('should apply filter for css rules if provided', () => {
    const mediaQueryFilter = jest.fn().mockImplementation(cssRule => {
      if (cssRule.startsWith('@media')) {
        return false;
      }

      return true;
    });
    const renderer = createDOMRenderer(document, { filterCssRule: mediaQueryFilter });

    const cssRules: CSSRulesByBucket = {
      t: ['@media only screen and (max-width: 600px) { .bar: { background-color: red; } }'],
      d: ['.foo { background-color: red; }'],
    };

    renderer.insertCSSRules(cssRules);

    expect(mediaQueryFilter).toHaveBeenCalledTimes(2);
    expect(mediaQueryFilter).toHaveNthReturnedWith(1, false);
    expect(mediaQueryFilter).toHaveNthReturnedWith(2, true);
  });
});
