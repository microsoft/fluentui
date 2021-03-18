import * as React from 'react';
import { useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
import { MenuTriggerState } from './MenuTrigger.types';
import { useMenuContext } from '../../menuContext';

// Helper type to select on parts of state the hook uses
type UseTriggerElementState = Pick<MenuTriggerState, 'children'>;

export const useTriggerElement = (state: UseTriggerElementState): MenuTriggerState => {
  const triggerRef = useMenuContext(context => context.triggerRef);
  const setOpen = useMenuContext(context => context.setOpen);
  const open = useMenuContext(context => context.open);
  const triggerId = useMenuContext(context => context.triggerId);
  const onHover = useMenuContext(context => context.onHover);
  const onContext = useMenuContext(context => context.onContext);

  // TODO also need to warn on React.Fragment usage
  const child = React.Children.only(state.children);

  const triggerProps: Partial<React.HTMLAttributes<HTMLElement>> = {
    'aria-haspopup': true,
    'aria-expanded': open,
    id: triggerId,
    ...(child.props || {}),
  };

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

  const onClick = useEventCallback((e: React.MouseEvent) => {
    setOpen(true);
    child.props?.onClick?.(e);
  });

  // context menu removes all other interactions
  if (onContext) {
    triggerProps.onContextMenu = onContextMenu;
  } else {
    triggerProps.onClick = onClick;

    if (onHover) {
      triggerProps.onMouseEnter = onMouseEnter;
      triggerProps.onMouseLeave = onMouseLeave;
    }
  }

  state.children = React.cloneElement(child, {
    ...child.props,
    ...triggerProps,
    ref: useMergedRefs(child.props.ref, triggerRef),
  });

  return state as MenuTriggerState;
};
