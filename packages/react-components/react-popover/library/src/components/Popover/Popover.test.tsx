import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Popover } from './Popover';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePopover_unstable } from './usePopover';
import { isConformant } from '../../testing/isConformant';
import { PopoverSurface } from '../PopoverSurface/index';
import { PopoverTrigger } from '../PopoverTrigger/index';
import type { PopoverProps } from './Popover.types';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <div>hello</div> },
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // Popover does not have own styles
      'make-styles-overrides-win',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('Should not render arrow if `coverTarget` is set to true', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ withArrow: true, positioning: { coverTarget: true }, children: <div /> }),
    );

    // Assert
    expect(result.current.withArrow).toBe(false);
  });

  describe('close on focus outside', () => {
    it('should close when trapFocus is enabled and focus moves from inside to outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(outsideButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(
        ({ open }) =>
          usePopover_unstable({
            open,
            trapFocus: true,
            onOpenChange,
            children: <div />,
          }),
        { initialProps: { open: true } },
      );

      // Set the contentRef to simulate mounted popover content
      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      // Focus first enters the popover content...
      act(() => {
        popoverContent.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      // ...and is then moved outside, which should dismiss the popover.
      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), { open: false });

      document.body.removeChild(outsideButton);
      document.body.removeChild(popoverContent);
    });

    it('should not close when focus moves outside but was never inside the popover', () => {
      // Focus stays on an external element the whole time and is programmatically re-focused.
      // Since focus never entered the popover, this outside -> outside change must not dismiss it.
      const onOpenChange = jest.fn();
      const externalInput = document.createElement('input');
      const popoverContent = document.createElement('div');
      document.body.appendChild(externalInput);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(
        ({ open }) =>
          usePopover_unstable({
            open,
            trapFocus: true,
            onOpenChange,
            children: <div />,
          }),
        { initialProps: { open: true } },
      );

      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      // Focus lands outside the popover (and was never inside it).
      act(() => {
        externalInput.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(externalInput);
      document.body.removeChild(popoverContent);
    });

    it('should not close when trapFocus is not enabled and focus moves outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      document.body.appendChild(outsideButton);

      renderHook(() =>
        usePopover_unstable({
          open: true,
          trapFocus: false,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(outsideButton);
    });

    it('should not close when popover is not open', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      document.body.appendChild(outsideButton);

      renderHook(() =>
        usePopover_unstable({
          open: false,
          trapFocus: true,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(outsideButton);
    });

    it('should also close when inertTrapFocus is enabled and focus moves from inside to a page element outside', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(outsideButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(() =>
        usePopover_unstable({
          open: true,
          trapFocus: true,
          inertTrapFocus: true,
          onOpenChange,
          children: <div />,
        }),
      );

      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      act(() => {
        popoverContent.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).toHaveBeenCalledWith(expect.anything(), { open: false });

      document.body.removeChild(outsideButton);
      document.body.removeChild(popoverContent);
    });

    it('should not close when closeOnFocusOutside is false', () => {
      const onOpenChange = jest.fn();
      const outsideButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(outsideButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(
        ({ open }) =>
          usePopover_unstable({
            open,
            trapFocus: true,
            closeOnFocusOutside: false,
            onOpenChange,
            children: <div />,
          } as unknown as PopoverProps),
        { initialProps: { open: true } },
      );

      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
      });

      act(() => {
        outsideButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(outsideButton);
      document.body.removeChild(popoverContent);
    });

    it('should not close when focus moves to the trigger element', () => {
      const onOpenChange = jest.fn();
      const triggerButton = document.createElement('button');
      const popoverContent = document.createElement('div');
      document.body.appendChild(triggerButton);
      document.body.appendChild(popoverContent);

      const { result } = renderHook(
        ({ open }) =>
          usePopover_unstable({
            open,
            trapFocus: true,
            onOpenChange,
            children: <div />,
          }),
        { initialProps: { open: true } },
      );

      act(() => {
        (result.current.contentRef as React.RefObject<HTMLElement | null>).current = popoverContent;
        (result.current.triggerRef as React.RefObject<HTMLElement | null>).current = triggerButton;
      });

      act(() => {
        triggerButton.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      });

      expect(onOpenChange).not.toHaveBeenCalled();

      document.body.removeChild(triggerButton);
      document.body.removeChild(popoverContent);
    });
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

    const renderPopover = (props: Partial<PopoverProps>) => (
      <Popover open withArrow {...props}>
        <PopoverTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Content</PopoverSurface>
      </Popover>
    );

    it('does not recreate the position manager when an open popover with an arrow re-renders', () => {
      const { rerender } = render(renderPopover({}));
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderPopover({}));
      rerender(renderPopover({}));
      rerender(renderPopover({}));

      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('recreates the position manager when the offset, size or arrow changes', () => {
      const { rerender } = render(renderPopover({ positioning: { offset: 4 } }));
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderPopover({ positioning: { offset: 4 } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);

      rerender(renderPopover({ positioning: { offset: 8 } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(1);

      rerender(renderPopover({ positioning: { offset: 8 }, size: 'small' }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(2);

      rerender(renderPopover({ positioning: { offset: 8 }, size: 'small', withArrow: false }));
      expect(countCreatedPositionManagers(addEventListener)).toBeGreaterThan(2);
    });

    it('keeps calling a stable offset function and recreates the position manager for a new one', async () => {
      const offset = jest.fn(() => ({ mainAxis: 2 }));
      const { rerender } = render(renderPopover({ positioning: { offset } }));
      await waitFor(() => expect(offset).toHaveBeenCalled());
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderPopover({ positioning: { offset } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);

      rerender(renderPopover({ positioning: { offset: () => ({ mainAxis: 2 }) } }));
      expect(countCreatedPositionManagers(addEventListener)).toBe(1);
    });

    it('repositions an open popover with an arrow after every re-render without recreating the position manager', async () => {
      const onPositioningEnd = jest.fn();
      const offset = jest.fn(() => ({ mainAxis: 2 }));
      const { rerender } = render(renderPopover({ positioning: { offset, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();
      onPositioningEnd.mockClear();
      offset.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');

      rerender(renderPopover({ positioning: { offset, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalledTimes(1));
      rerender(renderPopover({ positioning: { offset, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalledTimes(2));
      await settle();

      expect(onPositioningEnd).toHaveBeenCalledTimes(2);
      expect(offset).toHaveBeenCalled();
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('moves an open popover with an arrow to its trigger after the trigger moved and the popover re-rendered', async () => {
      // jsdom has no layout: give the viewport, the trigger and the surface sizes so that Floating UI computes positions
      const size = { width: 100, height: 40 };
      const triggerPosition = { left: 200, top: 300 };
      const spies = [
        jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000),
        jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(800),
        jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(size.width),
        jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(size.height),
        jest.spyOn(HTMLButtonElement.prototype, 'getBoundingClientRect').mockImplementation(() => {
          const { left, top } = triggerPosition;
          const { width, height } = size;
          return {
            x: left,
            y: top,
            left,
            top,
            width,
            height,
            right: left + width,
            bottom: top + height,
            toJSON: () => ({}),
          };
        }),
      ];
      const getTranslation = (element: HTMLElement) =>
        /translate(?:3d)?\((-?[\d.]+)px, (-?[\d.]+)px/.exec(element.style.transform)?.slice(1).map(Number);

      try {
        const onPositioningEnd = jest.fn();
        const { getByText, rerender } = render(renderPopover({ positioning: { onPositioningEnd } }));
        await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
        await settle();
        const surface = getByText('Content');
        // Centered above the trigger, separated from it by the 8px arrow of a medium popover
        expect(getTranslation(surface)).toEqual([200, 300 - 40 - 8]);
        onPositioningEnd.mockClear();

        triggerPosition.left = 260;
        rerender(renderPopover({ positioning: { onPositioningEnd } }));
        await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
        await settle();

        expect(getTranslation(surface)).toEqual([260, 300 - 40 - 8]);
      } finally {
        spies.forEach(spy => spy.mockRestore());
      }
    });

    it('does not reposition an open popover without an arrow when it re-renders', async () => {
      const onPositioningEnd = jest.fn();
      const { rerender } = render(renderPopover({ withArrow: false, positioning: { onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();
      onPositioningEnd.mockClear();

      rerender(renderPopover({ withArrow: false, positioning: { onPositioningEnd } }));
      rerender(renderPopover({ withArrow: false, positioning: { onPositioningEnd } }));
      await settle();

      expect(onPositioningEnd).not.toHaveBeenCalled();
    });

    it('provides the positioning imperative handle to a user positioningRef with and without an arrow', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { rerender, unmount } = render(renderPopover({ positioning: { positioningRef } }));
      expect(positioningRef.current?.updatePosition).toEqual(expect.any(Function));

      rerender(renderPopover({ withArrow: false, positioning: { positioningRef } }));
      expect(positioningRef.current?.updatePosition).toEqual(expect.any(Function));

      unmount();
      expect(positioningRef.current).toBeNull();
    });

    it('updates the position through a user positioningRef without recreating the position manager', async () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const onPositioningEnd = jest.fn();
      render(renderPopover({ positioning: { positioningRef, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();
      onPositioningEnd.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');

      positioningRef.current?.updatePosition();
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();

      expect(onPositioningEnd).toHaveBeenCalledTimes(1);
      expect(countCreatedPositionManagers(addEventListener)).toBe(0);
    });

    it('positions against the element passed to setTarget of a user positioningRef', async () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const onPositioningEnd = jest.fn();
      const target = document.createElement('div');
      document.body.append(target);
      const { getByText } = render(renderPopover({ positioning: { positioningRef, onPositioningEnd } }));
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();
      onPositioningEnd.mockClear();
      const addEventListener = jest.spyOn(window, 'addEventListener');
      const getTriggerRect = jest.spyOn(getByText('Trigger'), 'getBoundingClientRect');
      const getTargetRect = jest.spyOn(target, 'getBoundingClientRect');

      positioningRef.current?.setTarget(target);
      await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
      await settle();

      expect(countCreatedPositionManagers(addEventListener)).toBe(1);
      expect(onPositioningEnd).toHaveBeenCalledTimes(1);
      expect(getTargetRect).toHaveBeenCalled();
      expect(getTriggerRect).not.toHaveBeenCalled();
      target.remove();
    });

    it('detaches a user positioningRef callback that returns a cleanup the way React detaches callback refs', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref');
      const { unmount } = render(renderPopover({ positioning: { positioningRef } }));
      expect(events).toEqual(['ref(handle 1)']);

      unmount();

      expect(events).toEqual(['ref(handle 1)', detached('ref', 1)]);
    });

    it('detaches the previous user positioningRef callback once before attaching a new one', () => {
      const events: string[] = [];
      const firstPositioningRef = recordPositioningRef(events, 'first');
      const secondPositioningRef = recordPositioningRef(events, 'second');
      const { rerender, unmount } = render(renderPopover({ positioning: { positioningRef: firstPositioningRef } }));

      rerender(renderPopover({ positioning: { positioningRef: secondPositioningRef } }));
      expect(events).toEqual(['first(handle 1)', detached('first', 1), 'second(handle 1)']);

      unmount();
      expect(events).toEqual(['first(handle 1)', detached('first', 1), 'second(handle 1)', detached('second', 1)]);
    });

    it('calls a user positioningRef callback that returns no cleanup with null on unmount', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref', { returnsCleanup: false });
      const { unmount } = render(renderPopover({ positioning: { positioningRef } }));
      expect(events).toEqual(['ref(handle 1)']);

      unmount();

      expect(events).toEqual(['ref(handle 1)', 'ref(null)']);
    });

    it('detaches every user positioningRef callback attachment before the next one in strict mode and on target or arrow changes', () => {
      const events: string[] = [];
      const positioningRef = recordPositioningRef(events, 'ref');
      // Attachments and detachments alternate, and the ref stays attached while the popover is mounted
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
      const renderStrictPopover = (props: Partial<PopoverProps>) => (
        <React.StrictMode>{renderPopover(props)}</React.StrictMode>
      );

      const { rerender, unmount } = render(
        renderStrictPopover({ positioning: { positioningRef, target: firstTarget } }),
      );
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictPopover({ positioning: { positioningRef, target: secondTarget } }));
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictPopover({ withArrow: false, positioning: { positioningRef, target: secondTarget } }));
      expectAlternatingAttachments({ attached: true });
      rerender(renderStrictPopover({ positioning: { positioningRef, target: secondTarget } }));
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
      // "above" overflows the top of the viewport: Floating UI flips the popover below the trigger and runs its middleware
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

      const PositionedPopover = (props: {
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
          <Popover open withArrow={withArrow} positioning={{ onPositioningEnd, positioningRef }}>
            <PopoverTrigger disableButtonEnhancement>
              <button style={{ position: 'absolute', left, top }}>Trigger</button>
            </PopoverTrigger>
            <PopoverSurface>Content</PopoverSurface>
          </Popover>
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

      const renderPositionedPopover = async ({ withArrow = true, repositionAfterRender = false } = {}) => {
        const store = createPositionStore();
        const onPositioningEnd = jest.fn();
        const positioningRef = React.createRef<PositioningImperativeRef>();
        const { getByText } = render(
          <PositionedPopover
            store={store}
            withArrow={withArrow}
            onPositioningEnd={onPositioningEnd}
            positioningRef={repositionAfterRender ? positioningRef : undefined}
          />,
        );
        await waitFor(() => expect(onPositioningEnd).toHaveBeenCalled());
        await settle();
        onPositioningEnd.mockClear();

        return { store, onPositioningEnd, surface: getByText('Content') };
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

      it('applies the latest position when an earlier computation of a popover with an arrow resolves later', async () => {
        const { store, onPositioningEnd, surface } = await renderPositionedPopover();

        await moveTriggerDuringComputation(store, flippingPosition);

        // Centered above the latest trigger position, separated from it by the 8px arrow of a medium popover
        expect(getEndPlacements(onPositioningEnd)).toEqual(['top']);
        expect(surface.getAttribute('data-popper-placement')).toBe('top');
        expect(getTranslation(surface)).toEqual([200, 500 - 40 - 8]);
      });

      it('applies the latest position when an earlier computation of a popover without an arrow resolves later', async () => {
        const { store, onPositioningEnd, surface } = await renderPositionedPopover({
          withArrow: false,
          repositionAfterRender: true,
        });

        await moveTriggerDuringComputation(store, flippingPosition);

        expect(getEndPlacements(onPositioningEnd)).toEqual(['top']);
        expect(surface.getAttribute('data-popper-placement')).toBe('top');
        expect(getTranslation(surface)).toEqual([200, 500 - 40]);
      });

      it('applies the latest position when neither computation flips', async () => {
        const { store, onPositioningEnd, surface } = await renderPositionedPopover();

        await moveTriggerDuringComputation(store, fittingPosition);

        expect(getEndPlacements(onPositioningEnd).pop()).toBe('top');
        expect(getTranslation(surface)).toEqual([200, 500 - 40 - 8]);
      });

      it('applies both positions when the trigger moves again after the first computation resolved', async () => {
        const { store, onPositioningEnd, surface } = await renderPositionedPopover();

        await act(async () => {
          store.set(flippingPosition);
          await settle();
        });

        // Flipped below the trigger
        expect(getTranslation(surface)).toEqual([200, 10 + 40 + 8]);

        await act(async () => {
          store.set(latestPosition);
          await settle();
        });

        expect(getEndPlacements(onPositioningEnd)).toEqual(['bottom', 'top']);
        expect(getTranslation(surface)).toEqual([200, 500 - 40 - 8]);
      });
    });
  }
});
