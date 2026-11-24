import * as React from 'react';
import { act, render } from '@testing-library/react';
import { Sticky } from './Sticky';
import { StickyPositionType } from './Sticky.types';
import { ScrollablePaneContext } from '../ScrollablePane/ScrollablePane.types';
import { isConformant } from '../../common/isConformant';
import type { IScrollablePaneContext } from '../ScrollablePane/ScrollablePane.types';

describe('Sticky', () => {
  isConformant({
    Component: Sticky,
    displayName: 'Sticky',
    // Problem: Ref doesn't match DOM node and returns outermost div.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });
});

describe('Sticky placeholder width', () => {
  const createPaneContext = (): IScrollablePaneContext => ({
    scrollablePane: {
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      addSticky: jest.fn(),
      removeSticky: jest.fn(),
      updateStickyRefHeights: jest.fn(),
      sortSticky: jest.fn(),
      notifySubscribers: jest.fn(),
      syncScrollSticky: jest.fn(),
    },
    window: undefined,
  });

  const mockLayout = (
    element: Element,
    metrics: { scrollWidth: number; clientWidth: number; offsetWidth: number; rectWidth: number },
  ): void => {
    Object.defineProperty(element, 'scrollWidth', { configurable: true, value: metrics.scrollWidth });
    Object.defineProperty(element, 'clientWidth', { configurable: true, value: metrics.clientWidth });
    Object.defineProperty(element, 'offsetWidth', { configurable: true, value: metrics.offsetWidth });
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({ width: metrics.rectWidth } as DOMRect);
  };

  const renderSticky = (): Sticky => {
    const stickyRef = React.createRef<Sticky>();
    render(
      <ScrollablePaneContext.Provider value={createPaneContext()}>
        <Sticky ref={stickyRef} stickyPosition={StickyPositionType.Header}>
          <div>content</div>
        </Sticky>
      </ScrollablePaneContext.Provider>,
    );
    return stickyRef.current!;
  };

  it('uses the exact bounding-rect width when content does not overflow horizontally', () => {
    const sticky = renderSticky();
    const firstChild = sticky.nonStickyContent!.firstElementChild!;
    // Fractional layout (e.g. browser zoom): true border-box width is 701.6px, but the rounded
    // integer metrics report scrollWidth 700, clientWidth 700 and offsetWidth 702.
    mockLayout(firstChild, { scrollWidth: 700, clientWidth: 700, offsetWidth: 702, rectWidth: 701.6 });
    Object.defineProperty(sticky.nonStickyContent!, 'offsetHeight', { configurable: true, value: 30 });

    act(() => {
      sticky.setState({ isStickyTop: true });
    });

    // The placeholder must not exceed the true content width, otherwise ScrollablePane shows a
    // phantom horizontal scrollbar (issue #29383).
    expect(sticky.placeholder!.style.width).toBe('701.6px');
    expect(sticky.placeholder!.style.height).toBe('30px');
  });

  it('keeps the scrollWidth-based width when content genuinely overflows horizontally', () => {
    const sticky = renderSticky();
    const firstChild = sticky.nonStickyContent!.firstElementChild!;
    mockLayout(firstChild, { scrollWidth: 800, clientWidth: 700, offsetWidth: 702, rectWidth: 701.6 });

    act(() => {
      sticky.setState({ isStickyTop: true });
    });

    // scrollWidth + (offsetWidth - clientWidth) = 800 + (702 - 700)
    expect(sticky.placeholder!.style.width).toBe('802px');
  });
});
