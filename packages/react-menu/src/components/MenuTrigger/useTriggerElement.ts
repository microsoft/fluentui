import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
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

  const child = React.Children.only(state.children);

  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: triggerId,
    ...(child.props || {}),
  };
  /**
   * Opens menu when focused ONLY with keyboard focus
   */
  if (on.includes('focus')) {
    triggerProps.onFocus = (e: React.FocusEvent) => {
      if (isNavigatingWithKeyboard?.()) {
        setOpen(true);
      }
      child.props?.onFocus?.(e);
    };
  }

  /**
   * Opens the menu when clicked
   */
  if (on.includes('click')) {
    triggerProps.onClick = (e: React.MouseEvent) => {
      if (!on.includes('context')) {
        setOpen(true);
      }

      child.props?.onClick?.(e);
    };
  }

  /**
   * Opens menu on right click(onContextMenu)
   */
  if (on.includes('context')) {
    triggerProps.onContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(true);
      child.props?.onContextMenu?.(e);
    };
  }

  /**
   * Opens menu onMouseEnter
   * Closes menu onMouseLeave
   */
  if (on.includes('hover')) {
    triggerProps.onMouseEnter = (e: React.MouseEvent) => {
      setOpen(true);
      child.props?.onMouseEnter?.(e);
    };

    triggerProps.onMouseLeave = (e: React.MouseEvent) => {
      setOpen(false);
      child.props?.onMouseLeave?.(e);
    };
  }

  state.children = React.cloneElement(child as React.ReactElement, {
    ...child.props,
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state as MenuTriggerState;
};
