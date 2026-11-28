import { useBodyNoScrollStyles, useHTMLNoScrollStyles } from './useDisableBodyScroll.styles.css';

jest.mock('./useDisableBodyScroll.module.css', () => ({
  htmlNoScroll: 'css-htmlNoScroll',
  bodyNoScroll: 'css-bodyNoScroll',
}));

describe('useDisableBodyScroll CSS Modules styles', () => {
  it('returns the HTML scroll-lock class', () => {
    expect(useHTMLNoScrollStyles()).toBe('css-htmlNoScroll');
  });

  it('returns the body scroll-lock class', () => {
    expect(useBodyNoScrollStyles()).toBe('css-bodyNoScroll');
  });
});
