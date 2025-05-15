import * as React from 'react';
import { render } from '@testing-library/react';

import { SafeZoneArea, type SafeZoneAreaImperativeHandle, createSafeZoneAreaStateStore } from './SafeZoneArea';

function noop() {
  // do nothing
}

function createStoreMock(): ReturnType<typeof createSafeZoneAreaStateStore> {
  return {
    isActive: () => true,
    toggleActive: noop,
    subscribe: () => noop,
  };
}

function createDOMRectMock({ top, left, height, width }: Pick<DOMRect, 'top' | 'left' | 'height' | 'width'>): DOMRect {
  return {
    top,
    left,
    right: left + width,
    bottom: top + height,

    height,
    width,

    x: left,
    y: top,

    toJSON: () => '',
  } as DOMRect;
}

describe('SafeZoneArea', () => {
  describe('updateSVGs', () => {
    it.each([
      {
        placement: 'right' as const,
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 300, left: 0 }),
        mouseCoordinates: { x: 10, y: 10 },
      },
      {
        placement: 'left' as const,
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 300, left: 500 }),
        mouseCoordinates: { x: 310, y: 510 },
      },
      {
        placement: 'bottom' as const,
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 0, left: 300 }),
        mouseCoordinates: { x: 10, y: 350 },
      },
      {
        placement: 'top' as const,
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 0, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 400, left: 300 }),
        mouseCoordinates: { x: 410, y: 390 },
      },
    ])('updates SVGs', ({ placement, containerRect, targetRect, mouseCoordinates }) => {
      const imperativeRef = React.createRef<SafeZoneAreaImperativeHandle>();
      const { container } = render(
        <SafeZoneArea
          debug
          imperativeRef={imperativeRef}
          onMouseEnter={noop}
          onMouseLeave={noop}
          stateStore={createStoreMock()}
        />,
      );

      imperativeRef.current?.updateSVG({
        containerPlacementSide: placement,
        containerRect,
        targetRect,
        mouseCoordinates,
      });

      expect(container.querySelector('svg')).toMatchSnapshot();
    });
  });
});
