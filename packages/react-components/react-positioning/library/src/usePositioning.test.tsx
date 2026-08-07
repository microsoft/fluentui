import { act, render } from '@testing-library/react';
import * as React from 'react';
import { createPositionManager } from './createPositionManager';
import { usePositioning } from './usePositioning';
import { POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent, OnPositioningEndEventDetail, PositioningImperativeRef, PositioningProps } from './types';

// Mock createPositionManager to avoid @floating-ui/dom dependency in this test.
// The mock dispatches the positioning end event asynchronously (via microtask),
// matching the real implementation's debounce + computePosition promise chain.
jest.mock('./createPositionManager', () => ({
  createPositionManager: jest.fn(({ container }) => {
    const dispatchEnd = jest.fn(() => {
      Promise.resolve().then(() => {
        container.dispatchEvent(
          new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
            detail: {
              placement: 'bottom',
              escaped: false,
              referenceHidden: false,
            },
          }),
        );
      });
    });

    dispatchEnd();

    return {
      updatePosition: dispatchEnd,
      dispose: jest.fn(),
    };
  }),
}));

const createPositionManagerMock = createPositionManager as jest.MockedFunction<typeof createPositionManager>;
const getLastCreatedManager = () => {
  const { results } = createPositionManagerMock.mock;
  return results[results.length - 1]?.value;
};

function TestComponent({
  onPositioningEnd,
  positioningRef,
}: {
  onPositioningEnd?: PositioningProps['onPositioningEnd'];
  positioningRef?: PositioningProps['positioningRef'];
}) {
  const { targetRef, containerRef } = usePositioning({ onPositioningEnd, positioningRef });

  return (
    <>
      <button ref={targetRef} data-testid="target">
        Target
      </button>
      <div ref={containerRef} data-testid="container">
        Container
      </div>
    </>
  );
}

describe('usePositioning', () => {
  beforeEach(() => {
    createPositionManagerMock.mockClear();
  });

  describe('onPositioningEnd', () => {
    it('calls onPositioningEnd with the positioning event', async () => {
      const onPositioningEnd = jest.fn();

      render(<TestComponent onPositioningEnd={onPositioningEnd} />);

      // Flush microtasks so the async dispatch fires
      await act(async () => {
        await new Promise(process.nextTick);
      });

      expect(onPositioningEnd).toHaveBeenCalled();

      const event: OnPositioningEndEvent = onPositioningEnd.mock.calls[0][0];

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe(POSITIONING_END_EVENT);
      expect(event.detail.placement).toBe('bottom');
      expect(event.detail.escaped).toBe(false);
      expect(event.detail.referenceHidden).toBe(false);
    });

    it('works when onPositioningEnd is not provided', async () => {
      // Should not throw
      render(<TestComponent />);

      await act(async () => {
        await new Promise(process.nextTick);
      });
    });
  });

  it('still exposes updatePosition through positioningRef', async () => {
    const positioningRef = React.createRef<PositioningImperativeRef>();
    render(<TestComponent positioningRef={positioningRef} />);

    await act(async () => {
      await new Promise(process.nextTick);
    });

    const manager = getLastCreatedManager();

    act(() => {
      positioningRef.current?.updatePosition();
    });

    expect(manager?.updatePosition).toHaveBeenCalledTimes(2);
  });

  it('disposes the current manager on unmount', async () => {
    const { unmount } = render(<TestComponent />);

    await act(async () => {
      await new Promise(process.nextTick);
    });

    const manager = getLastCreatedManager();

    unmount();

    expect(manager?.dispose).toHaveBeenCalledTimes(1);
  });
});
