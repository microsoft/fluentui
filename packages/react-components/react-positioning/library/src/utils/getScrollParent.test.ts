import { getParentNode, getStyleComputedProperty, getScrollParent, hasScrollParent } from './getScrollParent';

describe('getParentNode', () => {
  it('returns the node itself if it is HTML', () => {
    const node = document.createElement('html');

    expect(getParentNode(node)).toBe(node);
  });

  it('returns the parent node for regular elements', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    parent.appendChild(child);

    expect(getParentNode(child)).toBe(parent);
  });

  it('returns the host for shadow DOM elements', () => {
    const host = document.createElement('div');
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const child = document.createElement('span');
    shadowRoot.appendChild(child);

    // Mock the host property since we can't directly test shadow DOM in JSDOM
    Object.defineProperty(child, 'parentNode', { value: null });
    Object.defineProperty(child, 'host', { value: host });

    expect(getParentNode(child as HTMLElement)).toBe(host);
  });
});

describe('getStyleComputedProperty', () => {
  it('returns empty object for non-element nodes', () => {
    const textNode = document.createTextNode('text');

    expect(getStyleComputedProperty(textNode as unknown as HTMLElement)).toEqual({});
  });

  it('returns computed style for element nodes', () => {
    const mockStyle: Partial<CSSStyleDeclaration> = {
      overflow: 'hidden',
    };

    const element = document.createElement('div');
    document.body.appendChild(element);

    jest
      .spyOn(window, 'getComputedStyle')
      .mockReturnValueOnce(mockStyle as Partial<CSSStyleDeclaration> as CSSStyleDeclaration);

    expect(getStyleComputedProperty(element)).toMatchObject(mockStyle);
  });

  it('returns an empty object when defaultView is null', () => {
    const el = document.createElement('div');
    const mockDocument: Partial<Document> = { defaultView: null };

    Object.defineProperty(el, 'ownerDocument', { value: mockDocument });

    expect(getStyleComputedProperty(el)).toEqual({});
  });
});

describe('getScrollParent', () => {
  it('returns document.body when node is null', () => {
    expect(getScrollParent(null)).toBe(document.body);
  });

  it('returns document.body for HTML and BODY nodes', () => {
    const htmlEl = document.createElement('html');
    const bodyEl = document.createElement('body');

    expect(getScrollParent(htmlEl)).toBe(document.body);
    expect(getScrollParent(bodyEl)).toBe(document.body);
  });

  it('returns document.body for document', () => {
    expect(getScrollParent(document)).toBe(document.body);
  });

  it('returns the element if it has overflow properties', () => {
    const parentEl = document.createElement('div');
    const childEl = document.createElement('div');

    parentEl.appendChild(childEl);
    document.body.appendChild(parentEl);

    jest.spyOn(window, 'getComputedStyle').mockReturnValueOnce({
      overflow: 'auto',
      overflowX: '',
      overflowY: '',
    } as Partial<CSSStyleDeclaration> as CSSStyleDeclaration);

    expect(getScrollParent(childEl)).toBe(parentEl);
  });

  it('recursively finds the first scrollable parent', () => {
    const scrollableEl = document.createElement('div');
    const middleEl = document.createElement('div');
    const childEl = document.createElement('div');

    scrollableEl.appendChild(middleEl);
    middleEl.appendChild(childEl);
    document.body.appendChild(scrollableEl);

    jest.spyOn(window, 'getComputedStyle').mockReturnValueOnce({
      overflow: 'visible',
      overflowX: '',
      overflowY: '',
    } as Partial<CSSStyleDeclaration> as CSSStyleDeclaration);
    jest.spyOn(window, 'getComputedStyle').mockReturnValueOnce({
      overflow: 'auto',
      overflowX: '',
      overflowY: '',
    } as Partial<CSSStyleDeclaration> as CSSStyleDeclaration);

    expect(getScrollParent(childEl)).toBe(scrollableEl);
  });
});

describe('hasScrollParent', () => {
  it('returns false when node is null', () => {
    expect(hasScrollParent(null)).toBe(false);
  });

  it('returns false when scroll parent is document.body', () => {
    expect(hasScrollParent(document.body)).toBe(false);
  });
});
