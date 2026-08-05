import { act, render } from '@testing-library/react';
import * as React from 'react';
import {
  AncestorMotionProvider_unstable,
  createAncestorMotionController_unstable,
} from '@fluentui/react-shared-contexts';
import { usePositioning } from './usePositioning';
import { createPositionManager } from './createPositionManager';
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
  it('updates on animation frames only while ancestor motion is active', async () => {
    const motionController = createAncestorMotionController_unstable();

    render(
      <AncestorMotionProvider_unstable value={motionController}>
        <TestComponent />
      </AncestorMotionProvider_unstable>,
    );

    expect(createPositionManager).toHaveBeenLastCalledWith(
      expect.objectContaining({ updatePositionOnAnimationFrame: false }),
    );
    const initialManagerCount = jest.mocked(createPositionManager).mock.calls.length;

    await act(async () => motionController.setActive(true));

    expect(createPositionManager).toHaveBeenLastCalledWith(
      expect.objectContaining({ updatePositionOnAnimationFrame: true }),
    );

    await act(async () => motionController.setActive(false));

    expect(createPositionManager).toHaveBeenLastCalledWith(
      expect.objectContaining({ updatePositionOnAnimationFrame: false }),
    );
    expect(createPositionManager).toHaveBeenCalledTimes(initialManagerCount + 2);
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
});
