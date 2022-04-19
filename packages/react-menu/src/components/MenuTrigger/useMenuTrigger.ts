import * as React from 'react';
import { MenuTriggerChildProps, MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import { useFocusFinders } from '@fluentui/react-tabster';
import { useFluent } from '@fluentui/react-shared-contexts';
import { ArrowRight, ArrowLeft, Escape, ArrowDown } from '@fluentui/keyboard-keys';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  useMergedEventCallbacks,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { shouldPreventDefaultOnKeyDown } from '@fluentui/react-utilities';

/**
 * Create the state required to render MenuTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup menu
 *
 * @param props - props from this instance of MenuTrigger
 */
export const useMenuTrigger_unstable = (props: MenuTriggerProps): MenuTriggerState => {
  const { children } = props;

  const triggerRef = useMenuContext_unstable(context => context.triggerRef);
  const menuPopoverRef = useMenuContext_unstable(context => context.menuPopoverRef);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const open = useMenuContext_unstable(context => context.open);
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const openOnHover = useMenuContext_unstable(context => context.openOnHover);
  const openOnContext = useMenuContext_unstable(context => context.openOnContext);

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

  const child = React.isValidElement(children) ? getTriggerChild(children) : undefined;

  const onContextMenu = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (openOnContext) {
      e.preventDefault();
      setOpen(e, { open: true, keyboard: false });
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

    if (!openOnContext) {
      setOpen(e, { open: !open, keyboard: openedWithKeyboardRef.current });
      openedWithKeyboardRef.current = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }

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
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover && hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
    }
  };

  // Opening a menu when a mouse hasn't moved and just entering the trigger is a bad a11y experience
  // First time open the mouse using mousemove and then continue with mouseenter
  // Only use once to determine that the user is using the mouse since it is an expensive event to handle
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover && !hasMouseMoved.current) {
      setOpen(e, { open: true, keyboard: false });
      hasMouseMoved.current = true;
    }
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (isTargetDisabled(e)) {
      return;
    }
    if (openOnHover) {
      setOpen(e, { open: false, keyboard: false });
    }
  };

  return {
    isSubmenu,
    children: applyTriggerPropsToChildren<MenuTriggerChildProps>(children, {
      'aria-haspopup': 'menu',
      'aria-expanded': !open && !isSubmenu ? undefined : open,
      id: triggerId,
      ...child?.props,
      ref: useMergedRefs(triggerRef, child?.ref),
      onClick: useMergedEventCallbacks(child?.props?.onClick, onClick),
      onMouseEnter: useMergedEventCallbacks(child?.props?.onMouseEnter, onMouseEnter),
      onMouseLeave: useMergedEventCallbacks(child?.props?.onMouseLeave, onMouseLeave),
      onKeyDown: useMergedEventCallbacks(child?.props?.onKeyDown, onKeyDown),
      onContextMenu: useMergedEventCallbacks(child?.props?.onContextMenu, onContextMenu),
      onMouseMove: useMergedEventCallbacks(child?.props?.onMouseMove, onMouseMove),
    }),
  };
};

const isTargetDisabled = (e: React.SyntheticEvent | Event) => {
  const isDisabled = (el: HTMLElement) =>
    el.hasAttribute('disabled') || (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') === 'true');
  if (e.target instanceof HTMLElement && isDisabled(e.target)) {
    return true;
  }

  return e.currentTarget instanceof HTMLElement && isDisabled(e.currentTarget);
};
