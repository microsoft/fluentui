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

  /**
   * The `classList[0]` half of the D15.1 / D16.2 invariant, asserted locally.
   *
   * react-positioning has no `isConformant` suite — `SafeZoneArea` is `@internal` and is not
   * exported from the package barrel — so the shared `component-has-group-marker` test never
   * runs against this element and this is its ONLY enforcement.
   *
   * A group marker must never be `classList[0]`: nwsapi's jsdom `:scope` polyfill builds its
   * selector anchor from `escape(element.classList[0])`, the `/` in `group/fui-safe-zone-area`
   * survives that escaping, and the spliced-in production is invalid — every `:scope` query
   * evaluated against the element then throws at render time. Real browsers implement
   * `:scope` natively and are unaffected, which is why VR cannot see this.
   *
   * Rendered INACTIVE on purpose (`isActive: () => false`): that is the wrapper's weakest
   * case, the one where the conditional `wrapper-active` slice is absent and the
   * unconditional `.wrapper` class is the only token standing between the marker and index 0.
   *
   * Declared LAST in the file on purpose: `SafeZoneArea` calls `useId()`, whose counter is
   * per-module and monotonic, and the committed `updateSVGs` snapshots pin the emitted
   * `fui-_r_N_` clip-path ids. Rendering anything ahead of them shifts every id by one and
   * turns an unrelated addition into a four-snapshot diff.
   */
  it('never emits a group marker as classList[0] on the safe-zone wrapper', () => {
    const { container } = render(
      <SafeZoneArea
        debug={false}
        imperativeRef={React.createRef<SafeZoneAreaImperativeHandle>()}
        onMouseEnter={noop}
        onMouseMove={noop}
        onMouseLeave={noop}
        stateStore={{ ...createStoreMock(), isActive: () => false }}
      />,
    );

    const wrapper = container.querySelector('[data-safe-zone]') as HTMLElement;

    expect(wrapper.classList.length).toBeGreaterThan(0);
    expect(wrapper.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(wrapper.classList).toContain('group/fui-safe-zone-area');
  });
});
