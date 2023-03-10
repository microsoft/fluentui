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
    expect(isHTMLElement(element) === element instanceof HTMLElement).toBe(true);
    expect(isHTMLElement({}) === {} instanceof HTMLElement).toBe(true);
  });
  it('should behave the same as instanceof HTMLInputElement for elements on the same realm', () => {
    const element = document.createElement('input');
    expect(
      isHTMLElement(element, {
        constructorName: 'HTMLInputElement',
      }) ===
        element instanceof HTMLInputElement,
    ).toBe(true);
    expect(isHTMLElement({}, { constructorName: 'HTMLInputElement' }) === {} instanceof HTMLInputElement).toBe(true);
  });
  it('should return true for instances of HTMLElement on different realms', () => {
    const element = new CustomHTMLElement();
    expect(isHTMLElement(element)).toBe(true);
    expect(element instanceof HTMLElement).toBe(false);
  });
  it('should return true for instances of HTMLInputElement on different realms', () => {
    const element = new CustomHTMLInputElement();
    expect(isHTMLElement(element, { constructorName: 'HTMLInputElement' })).toBe(true);
    expect(element instanceof HTMLInputElement).toBe(false);
  });
});
