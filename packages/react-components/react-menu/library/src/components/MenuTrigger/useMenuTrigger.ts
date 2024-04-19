import * as React from 'react';
import { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext_unstable } from '../../contexts/menuContext';
import { useIsSubmenu } from '../../utils/useIsSubmenu';
import { useFocusFinders, useRestoreFocusTarget } from '@fluentui/react-tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { ArrowRight, ArrowLeft, Escape, ArrowDown } from '@fluentui/keyboard-keys';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  isHTMLElement,
  mergeCallbacks,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useARIAButtonProps } from '@fluentui/react-aria';

/**
 * Create the state required to render MenuTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup menu
 *
 * @param props - props from this instance of MenuTrigger
 */
export const useMenuTrigger_unstable = (props: MenuTriggerProps): MenuTriggerState => {
  const { children, disableButtonEnhancement = false } = props;

  const triggerRef = useMenuContext_unstable(context => context.triggerRef);
  const menuPopoverRef = useMenuContext_unstable(context => context.menuPopoverRef);
  const setOpen = useMenuContext_unstable(context => context.setOpen);
  const open = useMenuContext_unstable(context => context.open);
  const triggerId = useMenuContext_unstable(context => context.triggerId);
  const openOnHover = useMenuContext_unstable(context => context.openOnHover);
  const openOnContext = useMenuContext_unstable(context => context.openOnContext);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

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

  const child = getTriggerChild(children);

  const onContextMenu = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event) || event.isDefaultPrevented()) {
      return;
    }

    if (openOnContext) {
      event.preventDefault();
      setOpen(event, { open: true, keyboard: false, type: 'menuTriggerContextMenu', event });
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }

    if (!openOnContext) {
      setOpen(event, { open: !open, keyboard: openedWithKeyboardRef.current, type: 'menuTriggerClick', event });
      openedWithKeyboardRef.current = false;
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }

    const key = event.key;

    if (!openOnContext && ((isSubmenu && key === OpenArrowKey) || (!isSubmenu && key === ArrowDown))) {
      setOpen(event, { open: true, keyboard: true, type: 'menuTriggerKeyDown', event });
    }

    if (key === Escape && !isSubmenu) {
      setOpen(event, { open: false, keyboard: true, type: 'menuTriggerKeyDown', event });
    }

    // if menu is already open, can't rely on effects to focus
    if (open && key === OpenArrowKey && isSubmenu) {
      focusFirst();
    }
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }
    if (openOnHover && hasMouseMoved.current) {
      setOpen(event, { open: true, keyboard: false, type: 'menuTriggerMouseEnter', event });
    }
  };

  // Opening a menu when a mouse hasn't moved and just entering the trigger is a bad a11y experience
  // First time open the mouse using mousemove and then continue with mouseenter
  // Only use once to determine that the user is using the mouse since it is an expensive event to handle
  const onMouseMove = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }
    if (openOnHover && !hasMouseMoved.current) {
      setOpen(event, { open: true, keyboard: false, type: 'menuTriggerMouseMove', event });
      hasMouseMoved.current = true;
    }
  };

  const onMouseLeave = (event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>) => {
    if (isTargetDisabled(event)) {
      return;
    }
    if (openOnHover) {
      setOpen(event, { open: false, keyboard: false, type: 'menuTriggerMouseLeave', event });
    }
  };

  const contextMenuProps = {
    id: triggerId,
    ...restoreFocusTargetAttribute,
    ...child?.props,
    ref: useMergedRefs(triggerRef, child?.ref),
    onMouseEnter: useEventCallback(mergeCallbacks(child?.props.onMouseEnter, onMouseEnter)),
    onMouseLeave: useEventCallback(mergeCallbacks(child?.props.onMouseLeave, onMouseLeave)),
    onContextMenu: useEventCallback(mergeCallbacks(child?.props.onContextMenu, onContextMenu)),
    onMouseMove: useEventCallback(mergeCallbacks(child?.props.onMouseMove, onMouseMove)),
  };

  const triggerChildProps = {
    'aria-haspopup': 'menu',
    'aria-expanded': !open && !isSubmenu ? undefined : open,
    ...contextMenuProps,
    onClick: useEventCallback(mergeCallbacks(child?.props.onClick, onClick)),
    onKeyDown: useEventCallback(mergeCallbacks(child?.props.onKeyDown, onKeyDown)),
  } as const;

  const ariaButtonTriggerChildProps = useARIAButtonProps(
    child?.type === 'button' || child?.type === 'a' ? child.type : 'div',
    triggerChildProps,
  );

  return {
    isSubmenu,
    children: applyTriggerPropsToChildren(
      children,
      openOnContext ? contextMenuProps : disableButtonEnhancement ? triggerChildProps : ariaButtonTriggerChildProps,
    ),
  };
};

const isTargetDisabled = (event: React.SyntheticEvent | Event) => {
  const isDisabled = (el: HTMLElement) =>
    el.hasAttribute('disabled') || (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') === 'true');
  if (isHTMLElement(event.target) && isDisabled(event.target)) {
    return true;
  }

  return isHTMLElement(event.currentTarget) && isDisabled(event.currentTarget);
};
