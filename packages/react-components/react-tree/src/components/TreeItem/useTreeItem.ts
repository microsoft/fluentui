import * as React from 'react';
import { getNativeElementProps, useEventCallback } from '@fluentui/react-utilities';
import type { TreeItemElement, TreeItemElementIntersection, TreeItemProps, TreeItemState } from './TreeItem.types';
import { useARIAButtonProps } from '@fluentui/react-aria';
import { useFocusFinders } from '@fluentui/react-tabster';
import { ArrowRight, ArrowLeft } from '@fluentui/keyboard-keys';
import { useTreeContext_unstable } from '../../contexts/treeContext';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
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

  const { openTrees, requestOpenChange, level, treeRef, subtreeRef } = useTreeContext_unstable();
  const { findFirstFocusable } = useFocusFinders();
  const { targetDocument } = useFluent_unstable();

  const isBranch = typeof ariaOwns === 'string';
  const open = React.useMemo(() => isBranch && openTrees.includes(ariaOwns!), [ariaOwns, openTrees, isBranch]);

  const handleClick = useEventCallback((event: React.MouseEvent<TreeItemElementIntersection>) => {
    if (isBranch) {
      requestOpenChange({ event, open: !open, type: 'click', id: ariaOwns! });
    }
  });
  const handleArrowRight = (event: React.KeyboardEvent<TreeItemElementIntersection>) => {
    if (open && isBranch) {
      // find first focusable on the subtree and focus on it
      const subtree = targetDocument?.getElementById(ariaOwns!);
      if (subtree) {
        subtree && findFirstFocusable(subtree)?.focus();
      }
    }
    if (isBranch && !open) {
      requestOpenChange({ event, open: true, type: 'arrowRight', id: ariaOwns! });
    }
  };
  const handleArrowLeft = (event: React.KeyboardEvent<TreeItemElementIntersection>) => {
    if ((!isBranch || !open) && subtreeRef.current && subtreeRef.current.id) {
      treeRef.current?.querySelector<TreeItemElementIntersection>(`[aria-owns="${subtreeRef.current.id}"]`)?.focus();
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
    open,
    isLeaf: !isBranch,
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
