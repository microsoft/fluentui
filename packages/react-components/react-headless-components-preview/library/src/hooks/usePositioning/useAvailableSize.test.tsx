import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import {
  AVAILABLE_HEIGHT_PROPERTY,
  AVAILABLE_WIDTH_PROPERTY,
  positioningSizeStyles,
  updateAvailableSize,
} from './useAvailableSize';
import type { PositioningProps } from './types';

const Surface = ({
  options,
  version = 0,
  style,
}: {
  options: PositioningProps;
  version?: number;
  style?: React.CSSProperties;
}) => {
  const { containerRef } = usePositioning(options);
  return <div key={version} ref={containerRef} data-testid="surface" style={{ ...positioningSizeStyles, ...style }} />;
};

describe('positioning available size', () => {
  let target: HTMLElement;
  let rect: DOMRect;

  beforeEach(() => {
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(600);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(800);
    rect = { top: 500, bottom: 520, left: 200, right: 280, width: 80, height: 20, x: 200, y: 500, toJSON: () => ({}) };
    target = document.createElement('button');
    target.getBoundingClientRect = () => rect;
  });

  afterEach(() => jest.restoreAllMocks());

  it('allows native fallback to the largest permitted block area', () => {
    const { getByTestId } = render(<Surface options={{ target, position: 'below', autoSize: 'height' }} />);
    expect(getByTestId('surface').style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('500px');
  });

  it('respects pinned placement and explicit fallback candidates', () => {
    const { getByTestId, rerender } = render(
      <Surface options={{ target, position: 'below', autoSize: 'height', pinned: true }} />,
    );
    const surface = getByTestId('surface');
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('80px');
    rerender(<Surface options={{ target, position: 'below', autoSize: 'height', fallbackPositions: ['after-top'] }} />);
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('100px');
  });

  it.each(['content-box', 'border-box'] as const)('accounts for padding and borders with %s sizing', boxSizing => {
    const { getByTestId } = render(
      <Surface
        options={{ target, autoSize: 'height', position: 'below' }}
        style={{
          boxSizing,
          paddingTop: '10px',
          paddingBottom: '6px',
          borderTop: '2px solid',
          borderBottom: '2px solid',
        }}
      />,
    );
    expect(getByTestId('surface').style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe(
      boxSizing === 'border-box' ? '500px' : '480px',
    );
  });

  it('updates on viewport resize and target replacement', async () => {
    const { getByTestId, rerender } = render(
      <Surface options={{ target, position: 'below', autoSize: 'height', pinned: true }} />,
    );
    const surface = getByTestId('surface');
    rect = { ...rect, top: 300, bottom: 320, y: 300 };
    act(() => window.dispatchEvent(new Event('resize')));
    await waitFor(() => expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('280px'));
    const replacement = document.createElement('button');
    replacement.getBoundingClientRect = () => ({ ...rect, bottom: 400 });
    rerender(<Surface options={{ target: replacement, position: 'below', autoSize: 'height', pinned: true }} />);
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('200px');
  });

  it('normalizes cumulative CSS zoom even without currentCSSZoom support', () => {
    const parent = document.createElement('div');
    const surface = document.createElement('div');
    parent.style.zoom = '2';
    surface.style.zoom = '1.5';
    const getComputedStyle = window.getComputedStyle.bind(window);
    jest.spyOn(window, 'getComputedStyle').mockImplementation(element => {
      const styles = getComputedStyle(element);
      Object.defineProperty(styles, 'zoom', { value: (element as HTMLElement).style.zoom || '1' });
      return styles;
    });
    Object.defineProperty(surface, 'currentCSSZoom', { value: undefined });
    parent.appendChild(surface);
    document.body.appendChild(parent);
    try {
      updateAvailableSize(surface, target, document, 'height', ['block-end']);
      expect(parseFloat(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY))).toBeCloseTo(80 / 3);
    } finally {
      parent.remove();
    }
  });

  it.each([
    [700, 1000, '600px', '390px'],
    [700, 200, '290px', '800px'],
    [100, 350, '600px', '390px'],
  ])('chooses a compatible pair for %sx%s content', (width, height, expectedHeight, expectedWidth) => {
    rect = { ...rect, top: 290, bottom: 310, left: 390, right: 410 };
    const surface = document.createElement('div');
    surface.getBoundingClientRect = () => ({ ...rect, width, height });
    updateAvailableSize(surface, target, document, true, ['block-end', 'inline-end']);
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe(expectedHeight);
    expect(surface.style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY)).toBe(expectedWidth);
  });

  it('rebinds containing-block observation and cancels queued updates on cleanup', () => {
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const observer = { observe, unobserve, disconnect };
    let notify: () => void = jest.fn();
    jest.spyOn(window, 'ResizeObserver').mockImplementation(callback => {
      notify = () => callback([], observer);
      return observer;
    });
    let parent = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(() => parent);
    const { rerender, unmount } = render(<Surface options={{ target, autoSize: 'height', strategy: 'absolute' }} />);
    expect(observe).toHaveBeenCalledWith(parent);
    const previous = parent;
    parent = document.createElement('div');
    rerender(<Surface options={{ target, autoSize: 'height', strategy: 'absolute' }} />);
    expect(unobserve).toHaveBeenCalledWith(previous);
    expect(observe).toHaveBeenCalledWith(parent);
    jest.spyOn(window, 'requestAnimationFrame').mockReturnValue(42);
    const cancel = jest.spyOn(window, 'cancelAnimationFrame');
    notify();
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(cancel).toHaveBeenCalledWith(42);
  });

  it('does not reuse a disconnected observer after the target changes', () => {
    const observers: Array<{ observe: jest.Mock; unobserve: jest.Mock; disconnect: jest.Mock }> = [];
    jest.spyOn(window, 'ResizeObserver').mockImplementation(() => {
      const observer = { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
      observers.push(observer);
      return observer;
    });
    const parent = document.createElement('div');
    jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(parent);
    const { rerender } = render(<Surface options={{ target, autoSize: 'height', strategy: 'absolute' }} />);
    const previous = observers[0];
    const calls = previous.observe.mock.calls.length;
    rerender(
      <Surface options={{ target: document.createElement('button'), autoSize: 'height', strategy: 'absolute' }} />,
    );
    expect(previous.disconnect).toHaveBeenCalledTimes(1);
    expect(previous.observe).toHaveBeenCalledTimes(calls);
    expect(observers[1].observe).toHaveBeenCalledWith(parent);
  });

  it.each([false, undefined] as const)('blocks inherited sizing when autoSize=%s', autoSize => {
    const { getByTestId } = render(<Surface options={{ target, autoSize }} />);
    expect(getByTestId('surface').style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('initial');
  });

  it('disables automatic sizing for covering surfaces and restores it when covering is removed', () => {
    const { getByTestId, rerender } = render(<Surface options={{ target, autoSize: 'height', coverTarget: true }} />);
    const surface = getByTestId('surface');
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('initial');
    rerender(<Surface options={{ target, autoSize: 'height' }} />);
    expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('500px');
  });

  it.each(['height', 'height-always', 'width', 'width-always', 'always', true] as const)(
    'supports canonical autoSize=%s without constraining disabled axes',
    autoSize => {
      const { getByTestId } = render(<Surface options={{ target, autoSize, position: 'below' }} />);
      const surface = getByTestId('surface');
      expect(surface.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe(
        autoSize === 'width' || autoSize === 'width-always'
          ? 'initial'
          : autoSize === true || autoSize === 'always'
          ? '80px'
          : '500px',
      );
      expect(surface.style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY)).toBe(
        autoSize === 'height' || autoSize === 'height-always' ? 'initial' : '800px',
      );
    },
  );

  it.each([
    ['ltr', 'before', 200],
    ['ltr', 'after', 520],
    ['rtl', 'before', 520],
    ['rtl', 'after', 200],
  ] as const)('sizes a pinned %s %s surface along the inline axis', (direction, position, expected) => {
    const { getByTestId } = render(
      <Surface options={{ target, autoSize: 'width', position, pinned: true }} style={{ direction }} />,
    );
    expect(getByTestId('surface').style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY)).toBe(`${expected}px`);
  });

  it('removes all viewport listeners when the sizing hook unmounts', () => {
    const add = jest.spyOn(window, 'addEventListener');
    const remove = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Surface options={{ target, autoSize: true }} />);
    const resize = add.mock.calls.find(
      ([event, , options]) => event === 'resize' && typeof options === 'object' && options.passive,
    );
    const scroll = add.mock.calls.find(([event, listener]) => event === 'scroll' && listener === resize?.[1]);
    expect(resize).toBeDefined();
    expect(scroll).toBeDefined();
    unmount();
    expect(remove).toHaveBeenCalledWith(...resize!);
    expect(remove).toHaveBeenCalledWith(...scroll!);
  });

  it('cleans both reserved properties from replaced and unmounted containers', () => {
    const { getByTestId, rerender, unmount } = render(<Surface options={{ target, autoSize: true }} />);
    const previous = getByTestId('surface');
    rerender(<Surface options={{ target, autoSize: true }} version={1} />);
    expect(previous.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('');
    expect(previous.style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY)).toBe('');
    const current = getByTestId('surface');
    unmount();
    expect(current.style.getPropertyValue(AVAILABLE_HEIGHT_PROPERTY)).toBe('');
    expect(current.style.getPropertyValue(AVAILABLE_WIDTH_PROPERTY)).toBe('');
  });
});
