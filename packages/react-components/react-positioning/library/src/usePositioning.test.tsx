import { act, render } from '@testing-library/react';
import * as React from 'react';
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
            detail: { placement: 'bottom' },
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

const TestComponent: React.FC<{ onPositioningEnd?: PositioningProps['onPositioningEnd'] }> = ({ onPositioningEnd }) => {
  const { targetRef, containerRef } = usePositioning({ onPositioningEnd });

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
    });

    it('works when onPositioningEnd is not provided', async () => {
      // Should not throw
      render(<TestComponent />);

      await act(async () => {
        await new Promise(process.nextTick);
      });
    });
  });
});
