import * as React from 'react';
import { useMergedRefs, useEventCallback, shouldPreventDefaultOnKeyDown } from '@fluentui/react-utilities';
import { getCode, keyboardKey } from '@fluentui/keyboard-key';
import { useFocusFinders } from '@fluentui/react-tabster';
import { MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext } from '../../contexts/menuContext';
import { isOutsideMenu } from '../../utils/index';

// Helper type to select on parts of state the hook uses
type UseTriggerElementState = Pick<MenuTriggerState, 'children'>;

/**
 * Adds the necessary props to the trigger element
 *
 * onHover -> adds mouseenter/mouseleave events
 * onContextMenu -> removes all events except for onContextMenu
 */
export const useTriggerElement = (state: UseTriggerElementState): MenuTriggerState => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const menuPopupRef = useMenuContext(context => context.menuPopupRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const onHover = useMenuContext(context => context.onHover);
  const onContext = useMenuContext(context => context.onContext);
  const isSubmenu = useMenuContext(context => context.isSubmenu);

  const { findFirstFocusable } = useFocusFinders();
  const openedWithKeyboardRef = React.useRef(false);
  React.useEffect(() => {
    if ((openedWithKeyboardRef.current && open) || (!isSubmenu && open)) {
      const firstFocusable = findFirstFocusable(menuPopupRef.current);
      firstFocusable?.focus();
    }

    openedWithKeyboardRef.current = false;
  }, [openedWithKeyboardRef, findFirstFocusable, menuPopupRef, open, isSubmenu]);

  // TODO also need to warn on React.Fragment usage
  const child = React.Children.only(state.children);

  const onContextMenu = useEventCallback((e: React.MouseEvent) => {
    if (onContext) {
      e.preventDefault();
      setOpen(true);
    }
    child.props?.onContextMenu?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent) => {
    // Click event will close the menu popup
    // Therefore, do not propagate click events to parent popup for nested menu trigger
    if (isSubmenu) {
      e.stopPropagation();
    }

    if (!onContext) {
      setOpen(!open);
    }
    child.props?.onClick?.(e);
  });

  const onKeyDown = useEventCallback((e: React.KeyboardEvent) => {
    if (shouldPreventDefaultOnKeyDown(e)) {
      e.preventDefault();
      openedWithKeyboardRef.current = true;
      (e.target as HTMLElement)?.click();
    }

    const keyCode = getCode(e);
    if (
      !onContext &&
      ((isSubmenu && keyCode === keyboardKey.ArrowRight) || (!isSubmenu && keyCode === keyboardKey.ArrowDown))
    ) {
      openedWithKeyboardRef.current = true;
      setOpen(true);
    }

    child.props?.onKeyDown?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent) => {
    if (onHover && !onContext) {
      setOpen(true);
    }
    child.props?.onMouseEnter?.(e);
  });

  // no mouse leave, since mouse enter sets focus for menu items
  const onBlur = useEventCallback((e: React.FocusEvent) => {
    if (isOutsideMenu({ menuPopupRef, triggerRef, event: e })) {
      setOpen(false);
    }

    child.props?.onBlur?.(e);
  });

  const disabled = child.props?.disabled;
  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: triggerId,
    ...(child.props || {}),

    // These handlers should always handle the child's props
    ...(!disabled && {
      // These handlers should always handle the child's original handlers
      onClick,
      onMouseEnter,
      onContextMenu,
      onKeyDown,
      onBlur,
    }),
  };

  state.children = React.cloneElement(child, {
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state as MenuTriggerState;
};
