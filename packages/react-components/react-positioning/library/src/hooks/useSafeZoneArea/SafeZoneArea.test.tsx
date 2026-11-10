import * as React from 'react';
import { render, act } from '@testing-library/react';

import type { createSafeZoneAreaStateStore } from './createSafeZoneAreaStateStore';
import { SafeZoneArea, type SafeZoneAreaImperativeHandle } from './SafeZoneArea';
import type { Point } from './types';

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
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 300, left: 0 }),
        mouseCoordinates: [10, 10] satisfies Point,
      },
      {
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 300, left: 500 }),
        mouseCoordinates: [310, 510] satisfies Point,
      },
      {
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 200, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 0, left: 300 }),
        mouseCoordinates: [10, 350] satisfies Point,
      },
      {
        containerRect: createDOMRectMock({ height: 300, width: 200, top: 0, left: 200 }),
        targetRect: createDOMRectMock({ height: 50, width: 100, top: 400, left: 300 }),
        mouseCoordinates: [410, 390] satisfies Point,
      },
    ])('updates SVGs', ({ containerRect, targetRect, mouseCoordinates }) => {
      const imperativeRef = React.createRef<SafeZoneAreaImperativeHandle>();
      const { container } = render(
        <SafeZoneArea
          debug
          imperativeRef={imperativeRef}
          onMouseEnter={noop}
          onMouseMove={noop}
          onMouseLeave={noop}
          stateStore={createStoreMock()}
        />,
      );

      act(() => {
        imperativeRef.current?.updateSVG({
          containerRect,
          targetRect,
          mouseCoordinates,
        });
      });

      expect(container.querySelector('svg')).toMatchSnapshot();
    });
  });
});
