import { act, render } from '@testing-library/react';
import * as React from 'react';
import { createPositionManager } from './createPositionManager';
import { usePositioning } from './usePositioning';
import { POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent, OnPositioningEndEventDetail, PositioningProps } from './types';

// Mock createPositionManager to avoid @floating-ui/dom dependency in this test.
// The mock dispatches the positioning end event asynchronously (via microtask),
// matching the real implementation's debounce + computePosition promise chain.
jest.mock('./createPositionManager', () => ({
  createPositionManager: jest.fn(({ container }: { container: HTMLElement }) => {
    const dispatchEnd = () => {
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
    };

    dispatchEnd();

    return {
      updatePosition: dispatchEnd,
      dispose: jest.fn(),
    };
  }),
}));

const createPositionManagerMock = createPositionManager as jest.MockedFunction<typeof createPositionManager>;

type TestComponentProps = {
  enabled?: boolean;
  onPositioningEnd?: PositioningProps['onPositioningEnd'];
};

const flushMicrotasks = async () => {
  await act(async () => {
    await new Promise(process.nextTick);
  });
};

const TestComponent = ({ enabled, onPositioningEnd }: TestComponentProps) => {
  const { targetRef, containerRef } = usePositioning({ enabled, onPositioningEnd });

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
};

describe('usePositioning', () => {
  beforeEach(() => {
    createPositionManagerMock.mockClear();
  });

  describe('onPositioningEnd', () => {
    it('calls onPositioningEnd with the positioning event', async () => {
      const onPositioningEnd = jest.fn();

      render(<TestComponent onPositioningEnd={onPositioningEnd} />);

      await flushMicrotasks();

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

      await flushMicrotasks();
    });

    it('uses the latest onPositioningEnd callback after rerender', async () => {
      const firstOnPositioningEnd = jest.fn();
      const secondOnPositioningEnd = jest.fn();
      const { getByTestId, rerender } = render(<TestComponent onPositioningEnd={firstOnPositioningEnd} />);

      await flushMicrotasks();

      const initialCallCount = firstOnPositioningEnd.mock.calls.length;

      expect(initialCallCount).toBeGreaterThan(0);

      rerender(<TestComponent onPositioningEnd={secondOnPositioningEnd} />);

      const event = new CustomEvent<OnPositioningEndEventDetail>(POSITIONING_END_EVENT, {
        detail: {
          placement: 'top',
          escaped: true,
          referenceHidden: true,
        },
      });

      getByTestId('container').dispatchEvent(event);

      expect(firstOnPositioningEnd).toHaveBeenCalledTimes(initialCallCount);
      expect(secondOnPositioningEnd).toHaveBeenCalledTimes(1);
      expect(secondOnPositioningEnd).toHaveBeenCalledWith(event);
    });

    it('does not create a manager when disabled', () => {
      render(<TestComponent enabled={false} />);

      expect(createPositionManagerMock).not.toHaveBeenCalled();
    });
  });
});
