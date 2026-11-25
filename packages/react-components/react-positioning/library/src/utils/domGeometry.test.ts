import { getReferenceRect, isContainingBlock } from './domGeometry';

describe('getReferenceRect', () => {
  it.each([
    {
      name: 'left/top instead of inconsistent x/y',
      bounds: { x: 0, y: 0, left: 320, top: 210, width: 20, height: 40 },
      expected: { x: 150, y: 50, width: 10, height: 10 },
    },
    {
      name: 'zero left/top instead of nonzero x/y',
      bounds: { x: 320, y: 210, left: 0, top: 0, width: 20, height: 40 },
      expected: { x: -10, y: -2.5, width: 10, height: 10 },
    },
    {
      name: 'x/y-only rects',
      bounds: { x: 320, y: 210, width: 20, height: 40 },
      expected: { x: 150, y: 50, width: 10, height: 10 },
    },
  ])('normalizes $name before applying the containing-block scale', ({ bounds, expected }) => {
    const floating = document.createElement('div');

    expect(
      getReferenceRect(
        { getBoundingClientRect: () => bounds },
        floating,
        floating,
        { x: 20, y: 10, scale: { x: 2, y: 4 } },
        'absolute',
      ),
    ).toEqual(expected);
  });
});

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
