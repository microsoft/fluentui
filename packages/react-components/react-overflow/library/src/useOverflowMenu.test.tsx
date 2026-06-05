import * as React from 'react';
import { render } from '@testing-library/react';
import { Overflow } from './components/Overflow';
import { OverflowItem } from './components/OverflowItem/OverflowItem';
import { useOverflowMenu } from './useOverflowMenu';

/**
 * Regression coverage for the breadcrumb SSR hydration failure, reproduced with the real
 * components (no mocks).
 *
 * The breadcrumb mounts its overflow menu on the very first commit whenever there are statically
 * partitioned overflow items — it is NOT gated on the measured `isOverflowing`. So the menu's `ref`
 * is attached before anything has been measured. React commits layout effects child-first, so the
 * menu's effect runs `forceUpdateOverflow()` synchronously BEFORE the parent `Overflow` container's
 * `onUpdateOverflow` (a `useEventCallback`) assignment effect has committed. The manager then
 * dispatches through that not-yet-assigned callback, whose default ref throws
 * "Cannot call an event handler while rendering" — aborting hydration so `#root-provider` never
 * settles and the SSR test times out.
 *
 * This reproduces deterministically under jsdom because `canUseDOM()` is true (so the real manager
 * is created) and the menu's dispatch is not gated on layout measurement — unlike the container's
 * first-paint force, which is skipped when the container reports a 0 size.
 */
const Menu: React.FC = () => {
  // Mounted unconditionally, mirroring breadcrumb's OverflowMenu when there are overflow items.
  const { ref } = useOverflowMenu<HTMLButtonElement>();
  return <button ref={ref}>menu</button>;
};

describe('useOverflowMenu', () => {
  // jsdom has no ResizeObserver. The manager's observeResize() falls back to console.error when it
  // is missing; once the hook is fixed the container observes and that error would pollute the run.
  // Mock it to a no-op (as in Overflow.firstPaint.test.tsx) so the test stays valid post-fix.
  // https://github.com/jsdom/jsdom/issues/3368
  let originalResizeObserver: typeof ResizeObserver;
  beforeAll(() => {
    originalResizeObserver = global.ResizeObserver;
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    } as unknown as typeof ResizeObserver;
  });
  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  it('does not dispatch synchronously from its mount effect before the container callback is ready', () => {
    expect(() =>
      render(
        <Overflow>
          <div>
            <OverflowItem id="1">
              <button>1</button>
            </OverflowItem>
            <OverflowItem id="2">
              <button>2</button>
            </OverflowItem>
            <OverflowItem id="3">
              <button>3</button>
            </OverflowItem>
            <Menu />
          </div>
        </Overflow>,
      ),
    ).not.toThrow();
  });
});
