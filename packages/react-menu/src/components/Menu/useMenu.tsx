import * as React from 'react';
import { usePopperMouseTarget, usePopper } from '@fluentui/react-positioning';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useControllableValue,
  useId,
  useOnClickOutside,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-provider';
import { elementContains } from '@fluentui/react-portal';
import { useFocusFinders } from '@fluentui/react-tabster';
import { MenuOpenChangeData, MenuOpenEvents, MenuProps, MenuState } from './Menu.types';
import { MenuTrigger } from '../MenuTrigger/index';
import { useMenuContext } from '../../contexts/menuContext';
import { MENU_ENTER_EVENT, useOnMenuMouseEnter } from '../../utils/index';

export const menuShorthandProps: (keyof MenuProps)[] = ['menuPopup'];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuState>({ deepMerge: menuShorthandProps });

/**
 * Create the state required to render Menu.
 *
 * The returned state can be modified with hooks such as useMenuStyles,
 * before being passed to renderMenu.
 *
 * @param props - props from this instance of Menu
 * @param ref - reference to root HTMLElement of Menu
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory Menu }
 */
export const useMenu = (props: MenuProps, defaultProps?: MenuProps): MenuState => {
  const triggerId = useId('menu');
  const isSubmenu = useMenuContext(context => context.hasMenuContext);

  const state = mergeProps(
    {
      menuPopup: { as: 'div' },
      position: isSubmenu ? 'after' : 'below',
      align: isSubmenu ? 'top' : 'start',
      openOnHover: isSubmenu,
      hoverDelay: 500,
      triggerId,
    },
    defaultProps,
    resolveShorthandProps(props, menuShorthandProps),
  );

  state.isSubmenu = isSubmenu;

  // TODO Better way to narrow types ?
  const children = React.Children.toArray(state.children) as React.ReactElement[];

  if (children.length !== 2 && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Menu can only take one MenuTrigger and one MenuList as children');
  }

  const [contextTarget, setContextTarget] = usePopperMouseTarget();
  state.setContextTarget = setContextTarget;
  state.contextTarget = contextTarget;

  if (!state.target && state.openOnContext && state.contextTarget) {
    state.target = state.contextTarget;
  }

  const { targetRef: triggerRef, containerRef: menuPopoverRef } = usePopper({
    align: state.align,
    position: state.position,
    coverTarget: state.coverTarget,
    offset: state.offset,
    target: state.target,
  });
  state.menuPopoverRef = menuPopoverRef;
  state.triggerRef = triggerRef;

  children.forEach(child => {
    if (child.type === MenuTrigger) {
      state.menuTrigger = child;
    } else {
      state.menuPopover = child;
    }
  });

  useMenuOpenState(state);
  useMenuSelectableState(state);

  return state;
};

/**
 * Adds appropriate state values and handlers for selectable items
 * i.e checkboxes and radios
 */
const useMenuSelectableState = (state: MenuState) => {
  const [checkedValues, setCheckedValues] = useControllableValue(state.checkedValues, state.defaultCheckedValues);
  const { onCheckedValueChange: onCheckedValueChangeOriginal } = state;
  state.checkedValues = checkedValues;
  state.onCheckedValueChange = useEventCallback((e, name, checkedItems) => {
    if (onCheckedValueChangeOriginal) {
      onCheckedValueChangeOriginal(e, name, checkedItems);
    }

    setCheckedValues(s => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  });
};

const useMenuOpenState = (state: MenuState) => {
  const { targetDocument } = useFluent();
  const parentSetOpen = useMenuContext(context => context.setOpen);
  const onOpenChange: MenuState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const shouldHandleKeyboadRef = React.useRef(false);
  const shouldHandleTabRef = React.useRef(false);
  const pressedShiftRef = React.useRef(false);
  const setOpenTimeout = React.useRef(0);
  const enteringTriggerRef = React.useRef(false);

  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  state.open = open !== undefined ? open : state.open;

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
      shouldHandleKeyboadRef.current = true;
      shouldHandleTabRef.current = (e as React.KeyboardEvent).key === 'Tab';
      pressedShiftRef.current = (e as React.KeyboardEvent).shiftKey;
    }

    if (data.bubble) {
      parentSetOpen(e, { ...data });
    }

    setOpen(data.open);
  });

  state.setOpen = useEventCallback((e: MenuOpenEvents, data: MenuOpenChangeData) => {
    clearTimeout(setOpenTimeout.current);
    if (!(e instanceof Event) && e.persist) {
      // < React 17 still uses pooled synthetic events
      e.persist();
    }

    if (e.type === 'mouseleave' || e.type === 'mouseenter' || e.type === 'mousemove' || e.type === MENU_ENTER_EVENT) {
      if (state.triggerRef.current?.contains(e.target as HTMLElement)) {
        enteringTriggerRef.current = e.type === 'mouseenter' || e.type === 'mousemove';
      }

      setOpenTimeout.current = setTimeout(() => trySetOpen(e, data), state.hoverDelay);
    } else {
      trySetOpen(e, data);
    }
  });

  useOnClickOutside({
    contains: elementContains,
    disabled: !state.open,
    element: targetDocument,
    refs: [state.menuPopoverRef, state.triggerRef],
    callback: e => state.setOpen(e, { open: false }),
  });
  useOnMenuMouseEnter({
    element: targetDocument,
    callback: e => {
      // When moving from a menu directly back to its trigger, this handler can close the menu
      // Explicitly check a flag to see if this situation happens
      if (!enteringTriggerRef.current) {
        state.setOpen(e, { open: false });
      }
    },
    disabled: !state.open,
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
    if (!shouldHandleKeyboadRef.current) {
      return;
    }

    if (open) {
      focusFirst();
    } else {
      if (shouldHandleTabRef.current && !state.isSubmenu) {
        pressedShiftRef.current ? focusBeforeMenuTrigger() : focusAfterMenuTrigger();
      } else {
        state.triggerRef.current?.focus();
      }
    }

    shouldHandleKeyboadRef.current = false;
    shouldHandleTabRef.current = false;
    pressedShiftRef.current = false;
  }, [state.triggerRef, state.isSubmenu, open, focusFirst, focusAfterMenuTrigger, focusBeforeMenuTrigger]);
};
