import { act, render } from '@testing-library/react';
import * as React from 'react';
import { usePositioning } from './usePositioning';
import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import type {
  OnPositioningEndEvent,
  OnPositioningEndEventDetail,
  PositioningBoundary,
  PositioningOptions,
  PositioningProps,
} from './types';

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

const TestComponent = ({ onPositioningEnd }: { onPositioningEnd?: PositioningProps['onPositioningEnd'] }) => {
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

const BoundaryTestComponent = ({
  hideBoundary,
  hideBoundaryDefault,
}: {
  hideBoundary?: PositioningBoundary | null;
  hideBoundaryDefault?: PositioningOptions['hideBoundaryDefault'];
}) => {
  const { targetRef, containerRef } = usePositioning({ hideBoundary, hideBoundaryDefault });

  return (
    <>
      <button ref={targetRef}>Target</button>
      <div ref={containerRef}>Container</div>
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

describe('usePositioning', () => {
  it('preserves Floating UI default hide boundaries when no component default is configured', () => {
    render(<BoundaryTestComponent />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    const hideMiddleware = middleware.filter(item => item.name === 'hide');
    expect(hideMiddleware).toHaveLength(2);
    hideMiddleware.forEach(item => {
      expect(item.options).not.toHaveProperty('boundary');
    });
  });

  it('supports separate component defaults for reference-hidden and escaped detection', () => {
    render(<BoundaryTestComponent hideBoundaryDefault={{ escaped: [] }} />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    const hideMiddleware = middleware.filter(item => item.name === 'hide');
    expect(hideMiddleware).toHaveLength(2);
    expect(hideMiddleware[0].options).toEqual({ strategy: 'referenceHidden' });
    expect(hideMiddleware[1].options).toEqual({ strategy: 'escaped', boundary: [] });
  });

  it('uses an explicit null boundary instead of component defaults', () => {
    render(<BoundaryTestComponent hideBoundary={null} hideBoundaryDefault={{ escaped: [] }} />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    const hideMiddleware = middleware.filter(item => item.name === 'hide');
    expect(hideMiddleware).toHaveLength(2);
    hideMiddleware.forEach(item => {
      expect(item.options).not.toHaveProperty('boundary');
    });
  });

  it.each<[string, PositioningBoundary]>([
    ['an empty element array', []],
    ['an element', document.createElement('div')],
    ['an element array', [document.createElement('div')]],
    ['a rect', { x: 0, y: 0, width: 100, height: 100 }],
  ])('forwards %s as the hide middleware boundary', (_description, hideBoundary) => {
    render(<BoundaryTestComponent hideBoundary={hideBoundary} hideBoundaryDefault={{ escaped: [] }} />);
    const calls = jest.mocked(createPositionManager).mock.calls;
    const { middleware } = calls[calls.length - 1][0];

    const hideMiddleware = middleware.filter(item => item.name === 'hide');
    expect(hideMiddleware).toHaveLength(2);
    hideMiddleware.forEach(item => {
      expect(item.options).toHaveProperty('boundary', hideBoundary);
      expect((item.options as { boundary: PositioningBoundary }).boundary).toBe(hideBoundary);
    });
  });

  it('resolves an explicit scrollParent boundary from the target for a portaled container', () => {
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
