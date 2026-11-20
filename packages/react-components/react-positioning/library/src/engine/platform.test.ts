import { isContainingBlock } from './platform';

describe('isContainingBlock', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('handles a CSS implementation without supports', () => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const win = frame.contentWindow!;
    Object.defineProperty(win, 'CSS', { configurable: true, value: {} });
    const element = win.document.createElement('div');
    element.style.filter = 'blur(1px)';
    win.document.body.appendChild(element);

    expect(isContainingBlock(element, win.getComputedStyle(element))).toBe(true);
  });

  it('uses the element owning window for WebKit detection', () => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const win = frame.contentWindow!;
    const supports = jest.fn().mockReturnValue(true);
    Object.defineProperty(win, 'CSS', { configurable: true, value: { supports } });
    const element = win.document.createElement('div');
    element.style.filter = 'blur(1px)';
    win.document.body.appendChild(element);

    expect(isContainingBlock(element, win.getComputedStyle(element))).toBe(false);
    expect(supports).toHaveBeenCalledWith('-webkit-backdrop-filter', 'none');
  });

  it.each(['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'])(
    'treats will-change: %s as a containing block',
    property => {
      const element = document.createElement('div');
      const style = { ...getComputedStyle(element), willChange: `opacity, ${property}` } as CSSStyleDeclaration;

      expect(isContainingBlock(element, style)).toBe(true);
      expect(isContainingBlock(element, { ...style, willChange: 'opacity' })).toBe(false);
    },
  );

  it('treats positioned elements as containing blocks of absolute descendants only', () => {
    const element = document.createElement('div');
    element.style.position = 'relative';
    document.body.appendChild(element);

    expect(isContainingBlock(element, getComputedStyle(element), true)).toBe(true);
    expect(isContainingBlock(element, getComputedStyle(element))).toBe(false);
  });
});
