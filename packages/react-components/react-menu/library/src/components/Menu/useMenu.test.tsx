import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useMenu_unstable } from './useMenu';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { PositioningImperativeRef } from '@fluentui/react-positioning';

const defaultMenuListContextValue: MenuListContextValue = {
  checkedValues: {},
  setFocusByFirstCharacter: () => null,
  toggleCheckbox: () => null,
  selectRadio: () => null,
  hasIcons: false,
  hasCheckmarks: false,
};

const submenuWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <MenuListProvider value={defaultMenuListContextValue}>{children}</MenuListProvider>
);

const trigger = <button key="trigger">trigger</button>;
const popover = <div key="popover">popover</div>;

describe('useMenu_unstable', () => {
  describe('context target', () => {
    it('sets and clears the positioning target synchronously through the exported setter', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { result } = renderHook(() =>
        useMenu_unstable({ children: [trigger, popover], openOnContext: true, positioning: { positioningRef } }),
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');

      act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));

      expect(setTarget).toHaveBeenLastCalledWith(result.current.contextTarget);
      expect(result.current.contextTarget?.getBoundingClientRect()).toEqual(
        expect.objectContaining({ left: 100, top: 200 }),
      );

      act(() => result.current.setContextTarget(undefined));

      expect(setTarget).toHaveBeenLastCalledWith(null);
      expect(result.current.contextTarget).toBeUndefined();
    });

    it('preserves an explicit positioning target when the context target changes', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const target = document.createElement('button');
      const { result } = renderHook(() =>
        useMenu_unstable({
          children: [trigger, popover],
          openOnContext: true,
          positioning: { positioningRef, target },
        }),
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');

      act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));
      act(() => result.current.setContextTarget(null));

      expect(setTarget).not.toHaveBeenCalled();
      expect(result.current.contextTarget).toBeUndefined();
    });

    it.each([undefined, null])('preserves an explicitly supplied target=%s', target => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { result, rerender } = renderHook(
        ({ openOnContext }) =>
          useMenu_unstable({
            children: [trigger, popover],
            openOnContext,
            positioning: { positioningRef, target },
          }),
        { initialProps: { openOnContext: true } },
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');

      act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));
      rerender({ openOnContext: false });
      rerender({ openOnContext: true });

      expect(setTarget).not.toHaveBeenCalled();
      expect(result.current.contextTarget?.getBoundingClientRect()).toEqual(
        expect.objectContaining({ left: 100, top: 200 }),
      );
    });

    it('reconciles an explicitly undefined target being added and removed', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { result, rerender } = renderHook(
        ({ explicit }) =>
          useMenu_unstable({
            children: [trigger, popover],
            openOnContext: true,
            positioning: { positioningRef, ...(explicit ? { target: undefined } : {}) },
          }),
        { initialProps: { explicit: false } },
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');
      act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));
      const target = result.current.contextTarget;
      setTarget.mockClear();

      rerender({ explicit: true });
      expect(setTarget).toHaveBeenLastCalledWith(null);

      rerender({ explicit: false });
      expect(setTarget).toHaveBeenLastCalledWith(target);
    });

    it('updates the target when context-menu mode changes without changing the exposed handle', () => {
      const positioningRef = jest.fn<void, [PositioningImperativeRef | null]>();
      const { result, rerender } = renderHook(
        ({ openOnContext }) =>
          useMenu_unstable({ children: [trigger, popover], openOnContext, positioning: { positioningRef } }),
        { initialProps: { openOnContext: true } },
      );
      const handle = positioningRef.mock.calls[0][0];
      if (!handle) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(handle, 'setTarget');
      act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));
      const target = result.current.contextTarget;
      setTarget.mockClear();

      rerender({ openOnContext: false });
      expect(setTarget).toHaveBeenLastCalledWith(null);

      rerender({ openOnContext: true });
      expect(setTarget).toHaveBeenLastCalledWith(target);
      expect(positioningRef).toHaveBeenCalledTimes(1);
      expect(positioningRef).toHaveBeenLastCalledWith(handle);
    });

    it.each([undefined, true])('preserves consumer close overrides with open=%s', open => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const target = document.createElement('button');
      const { result } = renderHook(() =>
        useMenu_unstable({
          children: [trigger, popover],
          open,
          defaultOpen: true,
          openOnContext: true,
          positioning: { positioningRef },
          onOpenChange: () => positioningRef.current?.setTarget(target),
        }),
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');
      const event = new MouseEvent('click');
      act(() => result.current.setOpen(event, { open: false, type: 'clickOutside', event }));

      expect(setTarget.mock.calls).toEqual([[null], [target]]);
      expect(result.current.open).toBe(open === true);
    });

    [undefined, true].forEach(open => {
      it.each(['undefined target', 'disabled context mode'])(
        `clears a close-time target override on departure to %s with open=${open}`,
        departure => {
          const positioningRef = React.createRef<PositioningImperativeRef>();
          const target = document.createElement('button');
          const { result, rerender } = renderHook(
            ({ departed }) =>
              useMenu_unstable({
                children: [trigger, popover],
                open,
                defaultOpen: true,
                openOnContext: !(departed && departure === 'disabled context mode'),
                positioning: {
                  positioningRef,
                  ...(departed && departure === 'undefined target' ? { target: undefined } : {}),
                },
                onOpenChange: (_, data) => {
                  if (!data.open) {
                    positioningRef.current?.setTarget(target);
                  }
                },
              }),
            { initialProps: { departed: false } },
          );
          if (!positioningRef.current) {
            throw new Error('Menu must expose its positioning handle');
          }
          const setTarget = jest.spyOn(positioningRef.current, 'setTarget');
          act(() => result.current.setContextTarget(new MouseEvent('contextmenu', { clientX: 100, clientY: 200 })));
          setTarget.mockClear();

          const event = new MouseEvent('click');
          act(() => result.current.setOpen(event, { open: false, type: 'clickOutside', event }));

          expect(setTarget.mock.calls).toEqual([[null], [target]]);
          expect(result.current.contextTarget).toBeUndefined();
          expect(result.current.open).toBe(open === true);
          setTarget.mockClear();

          rerender({ departed: false });
          expect(setTarget).not.toHaveBeenCalled();

          rerender({ departed: true });
          expect(setTarget).toHaveBeenCalledTimes(1);
          expect(setTarget).toHaveBeenLastCalledWith(null);
        },
      );
    });

    it('preserves an ordinary menu close override when an undefined target option is added', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const target = document.createElement('button');
      const { result, rerender } = renderHook(
        ({ explicit }) =>
          useMenu_unstable({
            children: [trigger, popover],
            defaultOpen: true,
            positioning: { positioningRef, ...(explicit ? { target: undefined } : {}) },
            onOpenChange: () => positioningRef.current?.setTarget(target),
          }),
        { initialProps: { explicit: false } },
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');
      const event = new MouseEvent('click');
      act(() => result.current.setOpen(event, { open: false, type: 'clickOutside', event }));

      expect(setTarget.mock.calls).toEqual([[target]]);
      setTarget.mockClear();
      rerender({ explicit: true });
      expect(setTarget).not.toHaveBeenCalled();
    });

    it('does not clear imperative targets when an ordinary menu closes', () => {
      const positioningRef = React.createRef<PositioningImperativeRef>();
      const { result } = renderHook(() =>
        useMenu_unstable({ children: [trigger, popover], defaultOpen: true, positioning: { positioningRef } }),
      );
      if (!positioningRef.current) {
        throw new Error('Menu must expose its positioning handle');
      }
      const setTarget = jest.spyOn(positioningRef.current, 'setTarget');
      const event = new MouseEvent('click');
      act(() => result.current.setOpen(event, { open: false, type: 'clickOutside', event }));

      expect(setTarget).not.toHaveBeenCalled();
      expect(result.current.open).toBe(false);
    });
  });

  describe('components and slots', () => {
    it('returns a surfaceMotion component', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      expect(result.current.components.surfaceMotion).toBeDefined();
    });

    it('configures the surfaceMotion slot with motion defaults derived from open', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], defaultOpen: true }));

      expect(result.current.surfaceMotion).toBeDefined();
      // visible/appear/unmountOnExit are runtime defaults injected via presenceMotionSlot
      // and aren't declared on the public Slot<PresenceMotionSlotProps> type
      const motionSlot = result.current.surfaceMotion as unknown as Record<string, unknown>;
      expect(motionSlot.visible).toBe(true);
      expect(motionSlot.appear).toBe(true);
      expect(motionSlot.unmountOnExit).toBe(true);
    });
  });

  describe('default prop values', () => {
    it('applies documented default values when no props are provided', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      expect(result.current.hoverDelay).toBe(500);
      expect(result.current.inline).toBe(false);
      expect(result.current.hasCheckmarks).toBe(false);
      expect(result.current.hasIcons).toBe(false);
      expect(result.current.closeOnScroll).toBe(false);
      expect(result.current.openOnContext).toBe(false);
      expect(result.current.persistOnItemClick).toBe(false);
      expect(result.current.mountNode).toBeNull();
      expect(result.current.openOnHover).toBe(false);
    });

    it('openOnHover defaults to true when rendered as a submenu', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }), {
        wrapper: submenuWrapper,
      });

      expect(result.current.isSubmenu).toBe(true);
      expect(result.current.openOnHover).toBe(true);
    });

    it('respects an explicit openOnHover prop over the submenu default', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], openOnHover: false }), {
        wrapper: submenuWrapper,
      });

      expect(result.current.openOnHover).toBe(false);
    });

    it('forwards explicit prop values into state', () => {
      const mountNode = document.createElement('div');
      const { result } = renderHook(() =>
        useMenu_unstable({
          children: [trigger, popover],
          hoverDelay: 100,
          inline: true,
          hasCheckmarks: true,
          hasIcons: true,
          closeOnScroll: true,
          openOnContext: true,
          persistOnItemClick: true,
          mountNode,
        }),
      );

      expect(result.current.hoverDelay).toBe(100);
      expect(result.current.inline).toBe(true);
      expect(result.current.hasCheckmarks).toBe(true);
      expect(result.current.hasIcons).toBe(true);
      expect(result.current.closeOnScroll).toBe(true);
      expect(result.current.openOnContext).toBe(true);
      expect(result.current.persistOnItemClick).toBe(true);
      expect(result.current.mountNode).toBe(mountNode);
    });
  });

  describe('children routing', () => {
    it('routes the first of two children to menuTrigger and the second to menuPopover', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      // React.Children.toArray clones elements with normalized keys, so we compare by
      // type + key rather than reference equality.
      expect((result.current.menuTrigger as React.ReactElement).type).toBe('button');
      expect((result.current.menuTrigger as React.ReactElement).key).toBe('.$trigger');
      expect((result.current.menuPopover as React.ReactElement).type).toBe('div');
      expect((result.current.menuPopover as React.ReactElement).key).toBe('.$popover');
    });

    it('routes a single child to menuPopover and leaves menuTrigger undefined', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: popover }));

      expect(result.current.menuTrigger).toBeUndefined();
      expect((result.current.menuPopover as React.ReactElement).type).toBe('div');
    });
  });

  describe('open state', () => {
    it('open defaults to false when neither open nor defaultOpen is set', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      expect(result.current.open).toBe(false);
    });

    it('respects defaultOpen on initial render (uncontrolled)', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], defaultOpen: true }));

      expect(result.current.open).toBe(true);
    });

    it('respects controlled open prop', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], open: true }));

      expect(result.current.open).toBe(true);
    });

    it('exposes a setOpen function on state', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      expect(typeof result.current.setOpen).toBe('function');
    });
  });

  describe('triggerId', () => {
    it('generates a non-empty triggerId', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      expect(typeof result.current.triggerId).toBe('string');
      expect(result.current.triggerId.length).toBeGreaterThan(0);
    });

    it('keeps the same triggerId across re-renders', () => {
      const { result, rerender } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));
      const initial = result.current.triggerId;
      rerender();

      expect(result.current.triggerId).toBe(initial);
    });
  });

  describe('selectable state', () => {
    it('respects defaultCheckedValues on initial render', () => {
      const defaultCheckedValues = { foo: ['1'] };

      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], defaultCheckedValues }));

      expect(result.current.checkedValues).toEqual(defaultCheckedValues);
    });

    it('uses controlled checkedValues over defaultCheckedValues', () => {
      const defaultCheckedValues = { foo: ['1'] };
      const checkedValues = { bar: ['2'] };

      // Passing both is an anti-pattern that useControllableState warns about; we
      // silence the expected console.error so the test output stays clean.
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      try {
        const { result } = renderHook(() =>
          useMenu_unstable({ children: [trigger, popover], defaultCheckedValues, checkedValues }),
        );

        expect(result.current.checkedValues).toEqual(checkedValues);
      } finally {
        consoleErrorSpy.mockRestore();
      }
    });

    it('forwards the change to onCheckedValueChange when items toggle', () => {
      const onCheckedValueChange = jest.fn();

      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover], onCheckedValueChange }));

      act(() => {
        result.current.onCheckedValueChange({} as React.MouseEvent, { name: 'foo', checkedItems: ['1'] });
      });

      expect(onCheckedValueChange).toHaveBeenCalledTimes(1);
      expect(onCheckedValueChange).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ name: 'foo', checkedItems: ['1'] }),
      );
      expect(result.current.checkedValues).toEqual({ foo: ['1'] });
    });
  });

  describe('isSubmenu detection', () => {
    it('isSubmenu is false at the root menu level', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }));

      expect(result.current.isSubmenu).toBe(false);
    });

    it('isSubmenu is true when rendered inside a MenuList parent context', () => {
      const { result } = renderHook(() => useMenu_unstable({ children: [trigger, popover] }), {
        wrapper: submenuWrapper,
      });

      expect(result.current.isSubmenu).toBe(true);
    });
  });
});
