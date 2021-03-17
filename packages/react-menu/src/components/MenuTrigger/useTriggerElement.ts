import * as React from 'react';
import { useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
import { useKeyboardNavigationState } from '@fluentui/react-focus-management';
import { MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext } from '../../menuContext';

// Helper type to select on parts of state the hook uses
type UseTriggerElementState = Pick<MenuTriggerState, 'children'>;

export const useTriggerElement = (state: UseTriggerElementState): MenuTriggerState => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const on = useMenuContext(context => context.on);
  const { isNavigatingWithKeyboard } = useKeyboardNavigationState();

  // TODO also need to warn on React.Fragment usage
  const child = React.Children.only(state.children);

  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: triggerId,
    ...(child.props || {}),
  };

  const onFocus = useEventCallback((e: React.FocusEvent) => {
    if (isNavigatingWithKeyboard()) {
      setOpen(true);
    }
    child.props?.onFocus?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent) => {
    if (!on.includes('context')) {
      setOpen(true);
    }

    child.props?.onClick?.(e);
  });

  const onContextMenu = useEventCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
    child.props?.onContextMenu?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent) => {
    setOpen(true);
    child.props?.onMouseEnter?.(e);
  });

  const onMouseLeave = useEventCallback((e: React.MouseEvent) => {
    setOpen(false);
    child.props?.onMouseLeave?.(e);
  });

  /**
   * Opens menu when focused ONLY with keyboard focus
   */
  if (on.includes('focus')) {
    triggerProps.onFocus = onFocus;
  }

  /**
   * Opens the menu when clicked
   */
  if (on.includes('click')) {
    triggerProps.onClick = onClick;
  }

  /**
   * Opens menu on right click(onContextMenu)
   */
  if (on.includes('context')) {
    triggerProps.onContextMenu = onContextMenu;
  }

  /**
   * Opens menu onMouseEnter
   * Closes menu onMouseLeave
   */
  if (on.includes('hover')) {
    triggerProps.onMouseEnter = onMouseEnter;

    triggerProps.onMouseLeave = onMouseLeave;
  }

  state.children = React.cloneElement(child as React.ReactElement, {
    ...child.props,
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state as MenuTriggerState;
};
