
import {
  setBodyScroll
} from './scroll';
let { expect } = chai;

describe('setBodyScroll', () => {
  it('can disable/enable scroll', () => {
    setBodyScroll(false);

    let style = getComputedStyle(document.body);

    expect(style.overflow).equals('hidden', 'overflow was not hidden.');

    setBodyScroll(true);

    expect(style.overflow).equals('visible', 'overflow was not visible.');
  });
});