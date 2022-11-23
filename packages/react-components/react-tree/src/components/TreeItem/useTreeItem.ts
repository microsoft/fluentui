import * as React from 'react';
import { getNativeElementProps, useEventCallback } from '@fluentui/react-utilities';
import type { TreeItemElement, TreeItemElementIntersection, TreeItemProps, TreeItemState } from './TreeItem.types';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';
import { useTreeContext_unstable } from '../../contexts/treeContext';
/**
 * Create the state required to render TreeItem.
 *
 * The returned state can be modified with hooks such as useTreeItemStyles_unstable,
 * before being passed to renderTreeItem_unstable.
 *
 * @param props - props from this instance of TreeItem
 * @param ref - reference to root HTMLElement of TreeItem
 */
export const useTreeItem_unstable = (props: TreeItemProps, ref: React.Ref<TreeItemElement>): TreeItemState => {
  const { 'aria-owns': ariaOwns, as = 'div', onKeyDown, ...rest } = props;

  const level = useTreeContext_unstable(ctx => ctx.level);
  const requestOpenChange = useTreeContext_unstable(ctx => ctx.requestOpenChange);
  const focusFirstSubtreeItem = useTreeContext_unstable(ctx => ctx.focusFirstSubtreeItem);
  const focusSubtreeOwnerItem = useTreeContext_unstable(ctx => ctx.focusSubtreeOwnerItem);

  const isBranch = typeof ariaOwns === 'string';
  const open = useTreeContext_unstable(ctx => isBranch && ctx.openSubtrees.includes(ariaOwns!));

  const handleClick = useEventCallback((event: React.MouseEvent<TreeItemElementIntersection>) => {
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'click', id: ariaOwns! });
    }
  });
  const handleArrowRight = (event: React.KeyboardEvent<TreeItemElementIntersection>) => {
    if (open && isBranch) {
      focusFirstSubtreeItem(event.currentTarget);
    }
    if (isBranch && !open) {
      requestOpenChange({ event, open: true, type: 'arrowRight', id: ariaOwns! });
    }
  };
  const handleArrowLeft = (event: React.KeyboardEvent<TreeItemElementIntersection>) => {
    if (!isBranch || !open) {
      focusSubtreeOwnerItem(event.currentTarget);
    }
    if (isBranch && open) {
      requestOpenChange({ event, open: false, type: 'arrowLeft', id: ariaOwns! });
    }
  };
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<TreeItemElementIntersection>) => {
    onKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    switch (event.code) {
      case ArrowRight: {
        return handleArrowRight(event);
      }
      case ArrowLeft: {
        return handleArrowLeft(event);
      }
    }
  });
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(
      as,
      useARIAButtonProps(as, {
        ...rest,
        // casting here is required to convert union to intersection
        ref: ref as React.Ref<TreeItemElementIntersection>,
        'aria-owns': ariaOwns,
        'aria-level': level,
        // FIXME: tabster fails to navigate when aria-expanded is true
        // 'aria-expanded': isBranch ? isOpen : undefined,
        role: 'treeitem',
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }),
    ),
  };
};
