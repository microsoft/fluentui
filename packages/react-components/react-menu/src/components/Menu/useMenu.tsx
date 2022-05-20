import * as React from 'react';
import { usePopperMouseTarget, usePopper, resolvePositioningShorthand } from '@fluentui/react-positioning';
import { useControllableState, useId, useOnClickOutside, useEventCallback } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { elementContains } from '@fluentui/react-portal';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { MENU_ENTER_EVENT, useOnMenuMouseEnter } from '../../utils/index';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import type { MenuOpenChangeData, MenuOpenEvents, MenuProps, MenuState } from './Menu.types';

/**
 * Create the state required to render Menu.
 *
 * The returned state can be modified with hooks such as useMenuStyles,
 * before being passed to renderMenu_unstable.
 *
 * @param props - props from this instance of Menu
 */
export const useMenu_unstable = (props: MenuProps): MenuState => {
  const triggerId = useId('menu');
  const isSubmenu = useIsSubmenu();
  const [contextTarget, setContextTarget] = usePopperMouseTarget();

  const popperState = {
    position: isSubmenu ? ('after' as const) : ('below' as const),
    align: isSubmenu ? ('top' as const) : ('start' as const),
    target: props.openOnContext ? contextTarget : undefined,
    ...resolvePositioningShorthand(props.positioning),
  };

  const children = React.Children.toArray(props.children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Menu must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('Menu must contain at most two children');
    }
  }

  let menuTrigger: React.ReactElement | undefined = undefined;
  let menuPopover: React.ReactElement | undefined = undefined;
  if (children.length === 2) {
    menuTrigger = children[0];
    menuPopover = children[1];
  } else if (children.length === 1) {
    menuPopover = children[0];
  }
  const { targetRef: triggerRef, containerRef: menuPopoverRef } = usePopper(popperState);

  const initialState = {
    hoverDelay: 500,
    triggerId,
    isSubmenu: !!isSubmenu,
    openOnHover: !!isSubmenu,
    contextTarget,
    setContextTarget,
    ...props,
    menuTrigger,
    menuPopover,
    triggerRef,
    menuPopoverRef,
    components: {},
  } as const;

  // TODO Better way to narrow types ?

  const [open, setOpen] = useMenuOpenState(initialState);
  const [checkedValues, onCheckedValueChange] = useMenuSelectableState(initialState);

  return {
    ...initialState,
    open,
    setOpen,
    checkedValues,
    onCheckedValueChange,
  };
};

/**
 * Adds appropriate state values and handlers for selectable items
 * i.e checkboxes and radios
 */
const useMenuSelectableState = (
  state: Pick<MenuProps, 'checkedValues' | 'defaultCheckedValues' | 'onCheckedValueChange'>,
) => {
  const [checkedValues, setCheckedValues] = useControllableState({
    state: state.checkedValues,
    defaultState: state.defaultCheckedValues,
    initialState: {},
  });
  const { onCheckedValueChange: onCheckedValueChangeOriginal } = state;
  const onCheckedValueChange: MenuState['onCheckedValueChange'] = useEventCallback((e, { name, checkedItems }) => {
    if (onCheckedValueChangeOriginal) {
      onCheckedValueChangeOriginal(e, { name, checkedItems });
    }

    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  });

  return [checkedValues, onCheckedValueChange] as const;
};

const useMenuOpenState = (
  state: Pick<
    MenuState,
    'isSubmenu' | 'menuPopoverRef' | 'onOpenChange' | 'setContextTarget' | 'triggerRef' | 'openOnContext'
  > &
    Pick<MenuProps, 'open' | 'defaultOpen'>,
) => {
  const { targetDocument } = useFluent();
  const parentSetOpen = useMenuContext_unstable(context => context.setOpen);
  const onOpenChange: MenuState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const shouldHandleKeyboardRef = React.useRef(false);
  const shouldHandleTabRef = React.useRef(false);
  const pressedShiftRef = React.useRef(false);
  const setOpenTimeout = React.useRef(0);
  const enteringTriggerRef = React.useRef(false);

  const [open, setOpenState] = useControllableState({
    state: state.open,
    defaultState: state.defaultOpen,
    initialState: false,
  });

  const trySetOpen = useEventCallback((e: MenuOpenEvents, data: MenuOpenChangeData) => {
    const event = e instanceof CustomEvent && e.type === MENU_ENTER_EVENT ? e.detail.nativeEvent : e;
    onOpenChange?.(event, { ...data });
    if (data.open && e.type === 'contextmenu') {
      state.setContextTarget(e as React.MouseEvent);
    }

    if (!data.open) {
      state.setContextTarget(undefined);
    }

    if (data.keyboard) {
      shouldHandleKeyboardRef.current = true;
      shouldHandleTabRef.current = (e as React.KeyboardEvent).key === 'Tab';
      pressedShiftRef.current = (e as React.KeyboardEvent).shiftKey;
    }

    if (data.bubble) {
      parentSetOpen(e, { ...data });
    }

    setOpenState(data.open);
  });

  const setOpen = useEventCallback((e: MenuOpenEvents, data: MenuOpenChangeData) => {
    clearTimeout(setOpenTimeout.current);
    if (!(e instanceof Event) && e.persist) {
      // < React 17 still uses pooled synthetic events
      e.persist();
    }

    if (e.type === 'mouseleave' || e.type === 'mouseenter' || e.type === 'mousemove' || e.type === MENU_ENTER_EVENT) {
      if (state.triggerRef.current?.contains(e.target as HTMLElement)) {
        enteringTriggerRef.current = e.type === 'mouseenter' || e.type === 'mousemove';
      }

      // FIXME leaking Node timeout type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setOpenTimeout.current = setTimeout(() => trySetOpen(e, data), state.hoverDelay);
    } else {
      trySetOpen(e, data);
    }
  });

  useOnClickOutside({
    contains: elementContains,
    disabled: !open,
    element: targetDocument,
    refs: [state.menuPopoverRef, !state.openOnContext && state.triggerRef].filter(
      Boolean,
    ) as React.MutableRefObject<HTMLElement>[],
    callback: e => setOpen(e, { open: false }),
  });
  useOnMenuMouseEnter({
    element: targetDocument,
    callback: e => {
      // When moving from a menu directly back to its trigger, this handler can close the menu
      // Explicitly check a flag to see if this situation happens
      if (!enteringTriggerRef.current) {
        setOpen(e, { open: false });
      }
    },
    disabled: !open,
    refs: [state.menuPopoverRef],
  });

  // Clear timeout on unmount
  // Setting state after a component unmounts can cause memory leaks
  React.useEffect(() => {
    return () => {
      clearTimeout(setOpenTimeout.current);
    };
  }, []);

  // Manage focus for open state
  const { findFirstFocusable, findNextFocusable, findPrevFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(state.menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, state.menuPopoverRef]);

  const focusAfterMenuTrigger = React.useCallback(() => {
    const nextFocusable = findNextFocusable(state.triggerRef.current);
    nextFocusable?.focus();
  }, [findNextFocusable, state.triggerRef]);

  const focusBeforeMenuTrigger = React.useCallback(() => {
    const prevFocusable = findPrevFocusable(state.triggerRef.current);
    prevFocusable?.focus();
  }, [findPrevFocusable, state.triggerRef]);

  React.useEffect(() => {
    if (open) {
      focusFirst();
    }
  }, [open, focusFirst]);

  React.useEffect(() => {
    if (open) {
      focusFirst();
    }

    if (shouldHandleKeyboardRef.current && !open) {
      if (shouldHandleTabRef.current && !state.isSubmenu) {
        pressedShiftRef.current ? focusBeforeMenuTrigger() : focusAfterMenuTrigger();
      } else {
        state.triggerRef.current?.focus();
      }
    }

    shouldHandleKeyboardRef.current = false;
    shouldHandleTabRef.current = false;
    pressedShiftRef.current = false;
  }, [state.triggerRef, state.isSubmenu, open, focusFirst, focusAfterMenuTrigger, focusBeforeMenuTrigger]);

  return [open ?? false, setOpen] as const;
};
