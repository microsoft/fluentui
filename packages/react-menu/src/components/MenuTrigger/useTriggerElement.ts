import * as React from 'react';
import { ArrowRight, ArrowDown, ArrowLeft, Escape } from '@fluentui/keyboard-keys';
import {
  applyTriggerPropsToChildren,
  useMergedRefs,
  useEventCallback,
  shouldPreventDefaultOnKeyDown,
} from '@fluentui/react-utilities';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useMenuContext } from '../../contexts/menuContext';
import { useFluent } from '@fluentui/react-shared-contexts';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import type { MenuTriggerChildProps, MenuTriggerState } from './MenuTrigger.types';

const noop = () => null;

/**
 * Adds the necessary props to the trigger element
 */
export const useTriggerElement = (state: MenuTriggerState): MenuTriggerState => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const menuPopoverRef = useMenuContext(context => context.menuPopoverRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const openOnHover = useMenuContext(context => context.openOnHover);
  const openOnContext = useMenuContext(context => context.openOnContext);
  const isSubmenu = useIsSubmenu();
  const { findFirstFocusable } = useFocusFinders();
  const focusFirst = React.useCallback(() => {
    const firstFocusable = findFirstFocusable(menuPopoverRef.current);
    firstFocusable?.focus();
  }, [findFirstFocusable, menuPopoverRef]);

  const openedWithKeyboardRef = React.useRef(false);
  const hasMouseMoved = React.useRef(false);

  const { dir } = useFluent();
  const OpenArrowKey = dir === 'ltr' ? ArrowRight : ArrowLeft;

  const child = React.isValidElement(state.children) ? state.children : undefined;

  const onContextMenu = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnContext) {
      e.preventDefault();
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onContextMenu?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!openOnContext) {
      setOpen(e, { open: !open, keyboard: openedWithKeyboardRef.current });
      openedWithKeyboardRef.current = false;
    }

    child?.props?.onClick?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      openedWithKeyboardRef.current = true;
      (e.target as HTMLElement)?.click();
    }

    const key = e.key;

    if (!openOnContext && ((isSubmenu && key === OpenArrowKey) || (!isSubmenu && key === ArrowDown))) {
      setOpen(e, { open: true, keyboard: true });
    }

    if (key === Escape && !isSubmenu) {
      setOpen(e, { open: false, keyboard: true });
    }

    // if menu is already open, can't rely on effects to focus
    if (open && key === OpenArrowKey && isSubmenu) {
      focusFirst();
    }

    if (open && key === ArrowDown && !isSubmenu) {
      focusFirst();
    }

    child?.props?.onKeyDown?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
    }

    child?.props?.onMouseEnter?.(e);
  });

  // Opening a menu when a mouse hasn't moved and just entering the trigger is a bad a11y experience
  // First time open the mouse using mousemove and then continue with mouseenter
  // Only use once to determine that the user is using the mouse since it is an expensive event to handle
  const onMouseMove = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover && !hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
      hasMouseMoved.current = true;
    }
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLElement>) => {
    if (openOnHover) {
      setOpen(e, { open: false, keyboard: false });
    }

    child?.props?.onMouseLeave?.(e);
  });

  const disabled = child?.props?.disabled;
  const triggerProps: MenuTriggerChildProps = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: child?.props?.id || triggerId,

    ...(!disabled
      ? {
          onClick,
          onMouseEnter,
          onMouseLeave,
          onContextMenu,
          onKeyDown,
          onMouseMove,
        }
      : // Spread disabled event handlers to implement contract and avoid specific disabled logic in handlers
        {
          onClick: noop,
          onMouseEnter: noop,
          onMouseLeave: noop,
          onContextMenu: noop,
          onKeyDown: noop,
          onMouseMove: noop,
        }),
  };

  state.children = applyTriggerPropsToChildren<MenuTriggerChildProps & { ref?: React.Ref<unknown> }>(state.children, {
    ...triggerProps,
    ref: useMergedRefs((typeof state.children !== 'function' && state.children.ref) || null, triggerRef),
  });

  return state as MenuTriggerState;
};
