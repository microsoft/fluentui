import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useMenu_unstable } from './useMenu';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';

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
