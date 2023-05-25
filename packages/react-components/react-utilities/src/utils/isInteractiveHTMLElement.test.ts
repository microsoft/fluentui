import { isInteractiveHTMLElement } from './isInteractiveHTMLElement';

describe('isInteractiveHTMLElement', () => {
  it.each([['BUTTON'], ['A'], ['INPUT'], ['TEXTAREA']])('should return true for %s', tagName => {
    expect(isInteractiveHTMLElement(document.createElement(tagName))).toBe(true);
  });

  it('should return true for contenteditable', () => {
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    // https://github.com/jsdom/jsdom/issues/1670
    // @ts-expect-error - JSDOM doesn't support contenteditable
    div.isContentEditable = true;

    expect(isInteractiveHTMLElement(div)).toBe(true);
  });
});
