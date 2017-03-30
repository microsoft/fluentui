import {
  disableBodyScroll,
  enableBodyScroll
} from './scroll';

let { expect } = chai;

describe('setBodyScroll', () => {
  it('can disable/enable scroll', () => {
    let style;

    disableBodyScroll();
    style = getComputedStyle(document.body);
    expect(style.overflow).equals('hidden', 'overflow was not hidden.');

    disableBodyScroll();
    style = getComputedStyle(document.body);
    expect(style.overflow).equals('hidden', 'overflow did not stay hidden.');

    enableBodyScroll();
    style = getComputedStyle(document.body);
    expect(style.overflow).equals('hidden', 'overflow did not stay hidden on first enable.');

    enableBodyScroll();
    style = getComputedStyle(document.body);
    expect(style.overflow).equals('visible', 'overflow did not become visible on second enable.');
  });
});