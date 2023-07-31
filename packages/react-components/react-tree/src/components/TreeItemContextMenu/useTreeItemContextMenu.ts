import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import type { TreeItemContextMenuProps, TreeItemContextMenuState } from './TreeItemContextMenu.types';
import { useMenu_unstable } from '@fluentui/react-menu';
import type { PositioningProps } from '@fluentui/react-positioning';
import * as React from 'react';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

/**
 * Create the state required to render TreeItemContextMenu.
 *
 * The returned state can be modified with hooks such as useTreeItemContextMenuStyles_unstable,
 * before being passed to renderTreeItemContextMenu_unstable.
 *
 * @param props - props from this instance of TreeItemContextMenu
 * @param ref - reference to root HTMLElement of TreeItemContextMenu
 */
export const useTreeItemContextMenu_unstable = (props: TreeItemContextMenuProps): TreeItemContextMenuState => {
  const positioningRef = useTreeItemContext_unstable(ctx => ctx.positioningRef);
  const menuPopoverRef = useTreeItemContext_unstable(ctx => ctx.menuPopoverRef);
  const isContextMenuOpen = useTreeItemContext_unstable(ctx => ctx.isContextMenuOpen);
  const requestContextMenuOpenChange = useTreeItemContext_unstable(ctx => ctx.requestContextMenuOpenChange);

  // Exhaustive deps is unnecessary because the positioningRef is a ref object
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const positioning: PositioningProps = React.useMemo(() => ({ positioningRef }), []);

  const menuState = useMenu_unstable({
    positioning,
    open: isContextMenuOpen,
    openOnContext: true,
    ...props,
    onOpenChange: useEventCallback((e, data) => {
      props.onOpenChange?.(e, data);
      requestContextMenuOpenChange(data);
    }),
  });

  menuState.menuPopoverRef = useMergedRefs(
    menuState.menuPopoverRef,
    menuPopoverRef,
  ) as React.MutableRefObject<HTMLElement>;

  return menuState;
};
