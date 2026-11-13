import * as React from 'react';
import { Tooltip } from './Tooltip';
import { isConformant } from '../../testing/isConformant';
import type { IsConformantOptions } from '@fluentui/react-conformance';
import type { PositioningImperativeRef, PositioningVirtualElement } from '@fluentui/react-positioning';
import type { TooltipProps } from './Tooltip.types';
import type { RenderResult } from '@testing-library/react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { resetIdsForTests, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

// testing-library's queryByRole function doesn't look inside portals
function queryByRoleTooltip(result: RenderResult) {
  const tooltips = result.baseElement.querySelectorAll('*[role="tooltip"]');
  if (!tooltips?.length) {
    return null;
  } else {
    expect(tooltips.length).toBe(1);
    return tooltips.item(0) as HTMLElement;
  }
}

// testing-library's getByRole function doesn't look inside portals
function getByRoleTooltip(result: RenderResult) {
  const tooltip = queryByRoleTooltip(result);
  expect(tooltip).not.toBeNull();
  return tooltip!;
}

export const getTooltipElement: IsConformantOptions['getTargetElement'] = (result, attr) => {
  return queryByRoleTooltip(result)!;
};

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: { content: 'Example', children: <button />, visible: true },
    getTargetElement: getTooltipElement,
    disabledTests: [
      // Tooltip renders into a Portal, which confuses these tests
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
    },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  it('renders only aria-label for a simple label tooltip', () => {
    const tooltipText = 'The tooltip text';
    const result = render(
      <Tooltip content={tooltipText} relationship="label">
        <button data-testid="the-target" />
      </Tooltip>,
    );

    const tooltip = queryByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip).toBeNull();
    expect(target.getAttribute('aria-label')).toBe(tooltipText);
  });

  it('renders the content of a nontrivial label tooltip', () => {
    const result = render(
      <Tooltip
        relationship="label"
        content={{
          children: (
            <span>
              This is a <strong>formatted</strong> tooltip
            </span>
          ),
          id: 'the-tooltip-id',
        }}
      >
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(tooltip.id).toBe('the-tooltip-id');
    expect(target.getAttribute('aria-labelledby')).toBe('the-tooltip-id');
  });

  it('renders a description tooltip content always', () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button />
      </Tooltip>,
    );

    const tooltip = getByRoleTooltip(result);
    const target = result.getByRole('button');
    expect(target.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it("doesn't set any aria attributes for relationship='inaccessible'", () => {
    const result = render(
      <Tooltip content="Inaccessible tooltip" relationship="inaccessible">
        <button />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.hasAttribute('aria-label')).toBe(false);
    expect(target.hasAttribute('aria-labelledby')).toBe(false);
    expect(target.hasAttribute('aria-description')).toBe(false);
    expect(target.hasAttribute('aria-describedby')).toBe(false);
  });

  it("doesn't override trigger's aria-label", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-label="test-label" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-label')).toBe('test-label');
    expect(target.getAttribute('aria-labelledby')).toBe(null);
  });

  it("doesn't override trigger's aria-labelledby", () => {
    const result = render(
      <Tooltip content="Label tooltip" relationship="label">
        <button aria-labelledby="test-labelledby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-labelledby')).toBe('test-labelledby');
  });

  it("doesn't override trigger's aria-describedby", () => {
    const result = render(
      <Tooltip content="Description tooltip" relationship="description">
        <button aria-describedby="test-describedby" />
      </Tooltip>,
    );

    const target = result.getByRole('button');
    expect(target.getAttribute('aria-description')).toBe(null);
    expect(target.getAttribute('aria-describedby')).toBe('test-describedby');
  });

  it('hides the tooltip when the document becomes hidden (e.g. tab backgrounded on mobile)', () => {
    const onVisibleChange = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible onVisibleChange={onVisibleChange}>
        <button />
      </Tooltip>,
    );

    // Tooltip starts visible
    expect(queryByRoleTooltip(result)).not.toBeNull();

    // Simulate the tab being backgrounded / app switched on mobile
    const visibilityStateSpy = jest.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
    act(() => {
      fireEvent(document, new Event('visibilitychange'));
    });

    expect(onVisibleChange).toHaveBeenCalledWith(undefined, expect.objectContaining({ visible: false }));

    visibilityStateSpy.mockRestore();
  });

  it('remains visible when positioning geometry is unavailable', async () => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());

    expect(onPositioningEnd.mock.calls.at(-1)?.[0].detail).toEqual(
      expect.objectContaining({ escaped: false, referenceHidden: false }),
    );
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
  });

  it.each([
    { escaped: false, referenceHidden: false },
    { escaped: true, referenceHidden: false },
    { escaped: false, referenceHidden: true },
    { escaped: true, referenceHidden: true },
  ])('follows reference visibility for positioning flags %o', flags => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip content="Tooltip content" relationship="label" visible positioning={{ onPositioningEnd }}>
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);

    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', ...flags },
    });
    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility === 'hidden').toBe(flags.referenceHidden);
    if (flags.referenceHidden) {
      expect(getComputedStyle(tooltip).pointerEvents).toBe('none');
    }
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);

    const visibleEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: flags.escaped, referenceHidden: false },
    });
    act(() => tooltip.dispatchEvent(visibleEvent));

    expect(getByRoleTooltip(result)).toBe(tooltip);
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenCalledTimes(2);
    expect(onPositioningEnd).toHaveBeenLastCalledWith(visibleEvent);
  });

  it('hides when positioning reports an explicit DOM target as hidden', () => {
    const onPositioningEnd = jest.fn();
    const result = render(
      <Tooltip
        content="Tooltip content"
        relationship="label"
        visible
        positioning={{ target: document.body, onPositioningEnd }}
      >
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);
    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: false, referenceHidden: true },
    });

    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getComputedStyle(tooltip).visibility).toBe('hidden');
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);
  });

  it('remains visible when positioning reports a virtual target as hidden', () => {
    const onPositioningEnd = jest.fn();
    const virtualTarget: PositioningVirtualElement = {
      getBoundingClientRect: () => new DOMRect(),
    };
    const result = render(
      <Tooltip
        content="Tooltip content"
        relationship="label"
        visible
        positioning={{ target: virtualTarget, onPositioningEnd }}
      >
        <button />
      </Tooltip>,
    );
    const tooltip = getByRoleTooltip(result);
    const positioningEvent = new CustomEvent('fui-positioningend', {
      detail: { placement: 'top', escaped: false, referenceHidden: true },
    });

    act(() => tooltip.dispatchEvent(positioningEvent));

    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');
    expect(onPositioningEnd).toHaveBeenLastCalledWith(positioningEvent);
  });

  describe('arrow offset', () => {
    afterEach(() => {
      // Restores the spies of a test that failed before restoring them, so that the next test counts only its own calls
      jest.restoreAllMocks();
    });

    // createPositionManager() adds exactly one window "resize" listener per position manager it creates
    const countCreatedPositionManagers = (spy: jest.SpyInstance) =>
      spy.mock.calls.filter(([type]) => type === 'resize').length;
    // Lets pending position updates (microtasks) and their positioning end events complete
    const settle = () =>
      new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      });
    // React 19 calls the cleanup returned by a callback ref instead of calling the callback with null. Earlier versions
    // ignore the returned cleanup and call the callback with null.
    const reactVersion = parseInt(React.version, 10);
    const detached = (name: string, attachment: number) =>
      reactVersion >= 19 ? `${name} cleanup ${attachment}` : `${name}(null)`;
    // Returns a user positioningRef callback that records its calls, and the calls of the cleanups it returns, in order
    const recordPositioningRef = (events: string[], name: string, { returnsCleanup = true } = {}) => {
      let attachments = 0;

      return (handle: PositioningImperativeRef | null) => {
        if (!handle) {
          events.push(`${name}(null)`);
          return undefined;
        }

        attachments += 1;
        const attachment = attachments;
        events.push(`${name}(handle ${attachment})`);

        return returnsCleanup
          ? () => {
              events.push(`${name} cleanup ${attachment}`);
            }
          : undefined;
      };
    };

    const renderTooltip = (props: Partial<TooltipProps>) => (
      <Tooltip content="Tooltip content" relationship="label" visible withArrow {...props}>
        <button />
      </Tooltip>
    );

    it('does not recreate the position manager when a visible tooltip with an arrow re-renders', () => {
      const { rerender } = render(renderTooltip({}));
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderTooltip({}));
      rerender(renderTooltip({}));
      rerender(renderTooltip({}));

      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('recreates the position manager when the offset or arrow changes', () => {
      const { rerender } = render(renderTooltip({ positioning: { offset: 4 } }));
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderTooltip({ positioning: { offset: 4 } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);

      rerender(renderTooltip({ positioning: { offset: 8 } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(1);

      rerender(renderTooltip({ positioning: { offset: 8 }, withArrow: false }));
      expect(countCreatedPositionManagers(addEventListener)).toBeGreaterThan(1);
    });

    it('repositions a visible tooltip with an arrow after every re-render without recreating the position manager', async () => {
      const onPositioningEnd = jest.fn();
      const { rerender } = render(renderTooltip({ positioning: { onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);
      onPositioningEnd.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderTooltip({ positioning: { onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalledTimes(1));
      rerender(renderTooltip({ positioning: { onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalledTimes(2));
      await act(settle);

      expect(onPositioningEnd).toHaveBeenCalledTimes(2);
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('does not reposition a visible tooltip without an arrow when it re-renders', async () => {
      const onPositioningEnd = jest.fn();
      const { rerender } = render(renderTooltip({ withArrow: false, positioning: { onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);
      onPositioningEnd.mockClear();

      rerender(renderTooltip({ withArrow: false, positioning: { onPositioningEnd } }));
      rerender(renderTooltip({ withArrow: false, positioning: { onPositioningEnd } }));
      await act(settle);

      expect(onPositioningEnd).not.toHaveBeenCalled();
    });

    it('provides the positioning imperative handle to a user positioningRef with and without an arrow', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { rerender, unmount } = render(renderTooltip({ positioning: { positioningRef } }));
      expect(positioningRef.current?.updatePosition).toEqual(expect.any(Function));

      rerender(renderTooltip({ withArrow: false, positioning: { positioningRef } }));
      expect(positioningRef.current?.updatePosition).toEqual(expect.any(Function));

      unmount();
      expect(positioningRef.current).toBeNull();
    });

    it('updates the position through a user positioningRef without recreating the position manager', async () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const onPositioningEnd = jest.fn();
      render(renderTooltip({ positioning: { positioningRef, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);
      onPositioningEnd.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');

      positioningRef.current?.updatePosition();
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);

      expect(onPositioningEnd).toHaveBeenCalledTimes(1);
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('positions against the element passed to setTarget of a user positioningRef', async () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const onPositioningEnd = jest.fn();
      const target = document.createElement('div');
      document.body.append(target);
      const { getByRole } = render(renderTooltip({ positioning: { positioningRef, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);
      onPositioningEnd.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');
      const getTriggerRect = jest.spyOn(getByRole('button'), 'getBoundingClientRect');
      const getTargetRect = jest.spyOn(target, 'getBoundingClientRect');

      positioningRef.current?.setTarget(target);
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await act(settle);

      expect(countCreatedPositionManagers(addEventListener)).toBe(1);
      expect(onPositioningEnd).toHaveBeenCalledTimes(1);
      expect(getTargetRect).toHaveBeenCalled();
      expect(getTriggerRect).not.toHaveBeenCalled();
      target.remove();
    });

    it('detaches a user positioningRef callback that returns a cleanup the way React detaches callback refs', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref');
      const { unmount } = render(renderTooltip({ positioning: { positioningRef } }));
      expect(events).toEqual(['ref(handle 1)']);

      unmount();

      expect(events).toEqual(['ref(handle 1)', detached('ref', 1)]);
    });

    it('detaches the previous user positioningRef callback once before attaching a new one', () => {
      const events: string[] = [];
      const firstPositioningRef = recordPositioningRef(events, 'first');
      const secondPositioningRef = recordPositioningRef(events, 'second');
      const { rerender, unmount } = render(renderTooltip({ positioning: { positioningRef: firstPositioningRef } }));

      rerender(renderTooltip({ positioning: { positioningRef: secondPositioningRef } }));
      expect(events).toEqual(['first(handle 1)', detached('first', 1), 'second(handle 1)']);

      unmount();
      expect(events).toEqual(['first(handle 1)', detached('first', 1), 'second(handle 1)', detached('second', 1)]);
    });

    it('calls a user positioningRef callback that returns no cleanup with null on unmount', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref', { returnsCleanup: false });
      const { unmount } = render(renderTooltip({ positioning: { positioningRef } }));
      expect(events).toEqual(['ref(handle 1)']);

      unmount();

      expect(events).toEqual(['ref(handle 1)', 'ref(null)']);
    });

    it('detaches every user positioningRef callback attachment before the next one in strict mode and on target or arrow changes', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref');
      // Attachments and detachments alternate, and the ref stays attached while the tooltip is mounted
      const expectAlternatingAttachments = ({ attached }: { attached: boolean }) => {
        const attachments = Math.floor(events.length / 2) + (attached ? 1 : 0);
        const expected: string[] = [];
        for (let attachment = 1; attachment <= attachments; attachment++) {
          expected.push(`ref(handle ${attachment})`, detached('ref', attachment));
        }
        expect(events).toEqual(attached ? expected.slice(0, -1) : expected);
      };
      const firstTarget = document.createElement('div');
      const secondTarget = document.createElement('div');
      document.body.append(firstTarget, secondTarget);
      const renderStrictTooltip = (props: Partial<TooltipProps>) => (
        <React.StrictMode>{renderTooltip(props)}</React.StrictMode>
      );

      const { rerender, unmount } = render(
        renderStrictTooltip({ positioning: { positioningRef, target: firstTarget } }),
      );
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictTooltip({ positioning: { positioningRef, target: secondTarget } }));
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictTooltip({ withArrow: false, positioning: { positioningRef, target: secondTarget } }));
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictTooltip({ positioning: { positioningRef, target: secondTarget } }));
      expectAlternatingAttachments({ attached: true });
      unmount();
      expectAlternatingAttachments({ attached: false });
      firstTarget.remove();
      secondTarget.remove();
    });
  });

  // Moving the trigger while a position computation is in flight relies on React 19's act() committing
  // useSyncExternalStore updates in a microtask. React 17 has no useSyncExternalStore.
  if (parseInt(React.version, 10) >= 19) {
    describe('overlapping position updates', () => {
      type Position = { left: number; top: number };
      type PositionStore = ReturnType<typeof createPositionStore>;

      // "above" fits in the viewport
      const initialPosition: Position = { left: 200, top: 300 };
      // "above" overflows the top of the viewport: Floating UI flips the tooltip below the trigger and runs its middleware
      // again, so computing this position takes longer than computing a position that fits
      const flippingPosition: Position = { left: 200, top: 10 };
      const fittingPosition: Position = { left: 200, top: 200 };
      const latestPosition: Position = { left: 200, top: 500 };
      // Called with the trigger's top whenever Floating UI measures the trigger
      let onMeasureTrigger: ((top: number) => void) | undefined;

      // React commits the updates of an external store in a microtask, as it does for the stores of many state libraries
      function createPositionStore() {
        let position = initialPosition;
        const listeners = new Set<() => void>();

        return {
          get: () => position,
          set: (nextPosition: Position) => {
            position = nextPosition;
            listeners.forEach(listener => listener());
          },
          subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => {
              listeners.delete(listener);
            };
          },
        };
      }

      const PositionedTooltip = (props: {
        store: PositionStore;
        withArrow: boolean;
        onPositioningEnd: jest.Mock;
        positioningRef?: React.RefObject<PositioningImperativeRef | null>;
      }) => {
        const { store, withArrow, onPositioningEnd, positioningRef } = props;
        const { left, top } = React.useSyncExternalStore(store.subscribe, store.get);

        // A consumer can reposition after every render when the trigger may have moved
        useIsomorphicLayoutEffect(() => {
          positioningRef?.current?.updatePosition();
        });

        return (
          <Tooltip
            content="Tooltip content"
            relationship="label"
            visible
            withArrow={withArrow}
            positioning={{ onPositioningEnd, positioningRef }}
          >
            <button style={{ position: 'absolute', left, top }} />
          </Tooltip>
        );
      };

      // Lets every pending microtask, and therefore every pending position computation, complete
      const settle = () =>
        new Promise<void>(resolve => {
          setTimeout(resolve, 0);
        });
      const getTranslation = (element: HTMLElement) =>
        /translate(?:3d)?\((-?[\d.]+)px, (-?[\d.]+)px/.exec(element.style.transform)?.slice(1).map(Number);
      const getEndPlacements = (onPositioningEnd: jest.Mock) =>
        onPositioningEnd.mock.calls.map(([event]) => event.detail.placement);

      const renderPositionedTooltip = async ({ withArrow = true, repositionAfterRender = false } = {}) => {
        const store = createPositionStore();
        const onPositioningEnd = jest.fn();
        const positioningRef = React.createRef<PositioningImperativeRef>();
        const result = render(
          <PositionedTooltip
            store={store}
            withArrow={withArrow}
            onPositioningEnd={onPositioningEnd}
            positioningRef={repositionAfterRender ? positioningRef : undefined}
          />,
        );
        await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
        await settle();
        onPositioningEnd.mockClear();

        return { store, onPositioningEnd, tooltip: queryByRoleTooltip(result)! };
      };

      // Moves the trigger to `firstPosition`, then to `latestPosition` as soon as Floating UI measured the trigger at
      // `firstPosition`, i.e. while the computation of the first position is still in flight
      const moveTriggerDuringComputation = async (store: PositionStore, firstPosition: Position) => {
        onMeasureTrigger = top => {
          if (top === firstPosition.top) {
            onMeasureTrigger = undefined;
            queueMicrotask(() => store.set(latestPosition));
          }
        };

        await act(async () => {
          store.set(firstPosition);
          await settle();
        });

        expect(onMeasureTrigger).toBeUndefined();
      };

      beforeEach(() => {
        onMeasureTrigger = undefined;
        // jsdom has no layout: give the viewport and the elements sizes, and place the trigger where React rendered it
        jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000);
        jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(800);
        jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);
        jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(40);
        jest
          .spyOn(HTMLButtonElement.prototype, 'getBoundingClientRect')
          .mockImplementation(function (this: HTMLButtonElement) {
            const left = parseFloat(this.style.left);
            const top = parseFloat(this.style.top);
            onMeasureTrigger?.(top);

            return {
              x: left,
              y: top,
              left,
              top,
              width: 100,
              height: 40,
              right: left + 100,
              bottom: top + 40,
              toJSON: () => ({}),
            };
          });
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('applies the latest position when an earlier computation of a tooltip with an arrow resolves later', async () => {
        const { store, onPositioningEnd, tooltip } = await renderPositionedTooltip();

        await moveTriggerDuringComputation(store, flippingPosition);

        // Centered above the latest trigger position, separated from it by the 4px offset and the 6px arrow
        expect(getEndPlacements(onPositioningEnd)).toEqual(['top']);
        expect(tooltip.getAttribute('data-popper-placement')).toBe('top');
        expect(getTranslation(tooltip)).toEqual([200, 500 - 40 - 10]);
      });

      it('applies the latest position when an earlier computation of a tooltip without an arrow resolves later', async () => {
        const { store, onPositioningEnd, tooltip } = await renderPositionedTooltip({
          withArrow: false,
          repositionAfterRender: true,
        });

        await moveTriggerDuringComputation(store, flippingPosition);

        expect(getEndPlacements(onPositioningEnd)).toEqual(['top']);
        expect(tooltip.getAttribute('data-popper-placement')).toBe('top');
        expect(getTranslation(tooltip)).toEqual([200, 500 - 40 - 4]);
      });

      it('applies the latest position when neither computation flips', async () => {
        const { store, onPositioningEnd, tooltip } = await renderPositionedTooltip();

        await moveTriggerDuringComputation(store, fittingPosition);

        expect(getEndPlacements(onPositioningEnd).pop()).toBe('top');
        expect(getTranslation(tooltip)).toEqual([200, 500 - 40 - 10]);
      });

      it('applies both positions when the trigger moves again after the first computation resolved', async () => {
        const { store, onPositioningEnd, tooltip } = await renderPositionedTooltip();

        await act(async () => {
          store.set(flippingPosition);
          await settle();
        });

        // Flipped below the trigger
        expect(getTranslation(tooltip)).toEqual([200, 10 + 40 + 10]);

        await act(async () => {
          store.set(latestPosition);
          await settle();
        });

        expect(getEndPlacements(onPositioningEnd)).toEqual(['bottom', 'top']);
        expect(getTranslation(tooltip)).toEqual([200, 500 - 40 - 10]);
      });
    });
  }
});
