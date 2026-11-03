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

    expect(isContainingBlock(element, win.getComputedStyle(element), 'fixed')).toBe(true);
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

    expect(isContainingBlock(element, win.getComputedStyle(element), 'fixed')).toBe(false);
    expect(supports).toHaveBeenCalledWith('-webkit-backdrop-filter', 'none');
  });
});
