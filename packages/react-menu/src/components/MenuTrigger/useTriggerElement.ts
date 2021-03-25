import * as React from 'react';
import { useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
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

  // TODO also need to warn on React.Fragment usage
  const child = React.Children.only(state.children);

  const onContextMenu = useEventCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (onContext) {
      setOpen(true);
    }
    child.props?.onContextMenu?.(e);
  });

  const onMouseEnter = useEventCallback((e: React.MouseEvent) => {
    if (onHover && !onContext) {
      setOpen(true);
    }
    child.props?.onMouseEnter?.(e);
  });

  const onClick = useEventCallback((e: React.MouseEvent) => {
    if (!onContext) {
      setOpen(!open);
    }
    child.props?.onClick?.(e);
  });

  const onBlur = useEventCallback((e: React.FocusEvent) => {
    if (isOutsideMenu({ menuPopupRef, triggerRef, event: e })) {
      setOpen(false);
    }

    child.props?.onBlur?.(e);
  });

  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: triggerId,
    ...(child.props || {}),

    // These handlers should always handle the child's props
    onClick,
    onMouseEnter,
    onContextMenu,
    onBlur,
  };

  state.children = React.cloneElement(child, {
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state as MenuTriggerState;
};
