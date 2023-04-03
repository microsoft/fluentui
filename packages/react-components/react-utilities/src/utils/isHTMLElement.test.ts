/* eslint-disable @fluentui/ban-instanceof-html-element */
import { isHTMLElement } from './isHTMLElement';

class CustomHTMLElement {
  public ownerDocument = customDocument;
}
class CustomHTMLInputElement {
  public ownerDocument = customDocument;
}

const customDocument = {
  defaultView: {
    HTMLElement: CustomHTMLElement,
    HTMLInputElement: CustomHTMLInputElement,
  },
} as Document;

describe('isHTMLElement', () => {
  it('should behave the same as instanceof HTMLElement for elements on the same realm', () => {
    const element = document.createElement('div');
    expect(isHTMLElement(element)).toBe(element instanceof HTMLElement);
    expect(isHTMLElement({})).toBe({} instanceof HTMLElement);
  });
  it('should behave the same as instanceof HTMLInputElement for elements on the same realm', () => {
    const element = document.createElement('input');
    expect(
      isHTMLElement(element, {
        constructorName: 'HTMLInputElement',
      }),
    ).toBe(element instanceof HTMLInputElement);
    expect(isHTMLElement({}, { constructorName: 'HTMLInputElement' })).toBe({} instanceof HTMLInputElement);
  });
  it('should return true for instances of HTMLElement on different realms', () => {
    const element = new CustomHTMLElement();
    expect(element instanceof HTMLElement).toBe(false);
    expect(isHTMLElement(element)).toBe(true);
  });
  it('should return true for instances of HTMLInputElement on different realms', () => {
    const element = new CustomHTMLInputElement();
    expect(element instanceof HTMLInputElement).toBe(false);
    expect(isHTMLElement(element, { constructorName: 'HTMLInputElement' })).toBe(true);
  });
});
