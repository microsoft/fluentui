import { act, render } from '@testing-library/react';
import * as React from 'react';
import { usePositioning } from './usePositioning';
import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
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

const ScrollBoundaryTestComponent = () => {
  const { targetRef, containerRef } = usePositioning({ hideBoundary: 'scrollParent' });

  return (
    <>
      <div data-testid="scroll-parent" style={{ overflow: 'scroll' }}>
        <button ref={targetRef}>Target</button>
      </div>
      <div ref={containerRef}>Portaled container</div>
    </>
  );
};

const NoScrollBoundaryTestComponent = () => {
  const { targetRef, containerRef } = usePositioning({ hideBoundary: 'scrollParent' });

  return (
    <>
      <button ref={targetRef}>Target</button>
      <div ref={containerRef}>Portaled container</div>
    </>
  );
};

describe('usePositioning', () => {
  it('omits hide middleware when the target has no scroll parent', () => {
    render(<NoScrollBoundaryTestComponent />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    expect(middleware.filter(item => item.name === 'hide')).toHaveLength(0);
  });

  it('uses the target scroll parent as the hide boundary for a portaled container', () => {
    const { getByTestId } = render(<ScrollBoundaryTestComponent />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    const hideMiddleware = middleware.filter(item => item.name === 'hide');
    expect(hideMiddleware).toHaveLength(2);
    hideMiddleware.forEach(item => {
      expect(item.options).toEqual(expect.objectContaining({ boundary: getByTestId('scroll-parent') }));
    });
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
