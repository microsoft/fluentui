import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { TreeOpenChangeData, TreeProps, TreeState, TreeNavigationData_unstable } from './Tree.types';
import { useNestedTreeNavigation, useOpenItemsState } from '../../hooks';
import { treeDataTypes } from '../../utils/tokens';
import { TreeItemRequest } from '../../contexts/index';

/**
 * Create the state required to render the root level Tree.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export function useRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  warnIfNoProperPropsRootTree(props);

  const { appearance = 'subtle', size = 'medium', selection = 'none' } = props;

  const [openItems, updateOpenItems] = useOpenItemsState(props);
  const [navigate, navigationRef] = useNestedTreeNavigation();

  const requestOpenChange = (data: TreeOpenChangeData) => {
    props.onOpenChange?.(data.event, data);
    if (data.event.isDefaultPrevented()) {
      return;
    }
    return updateOpenItems(data);
  };

  const requestNavigation = (data: TreeNavigationData_unstable) => {
    props.onNavigation_unstable?.(data.event, data);
    if (data.event.isDefaultPrevented()) {
      return;
    }
    navigate(data);
    if (data.type === treeDataTypes.ArrowDown || data.type === treeDataTypes.ArrowUp) {
      data.event.preventDefault();
    }
  };

  const handleTreeItemClick = ({
    event,
    value,
    itemType,
    type,
  }: Extract<TreeItemRequest, { type: 'Click' | 'ExpandIconClick' }>) => {
    ReactDOM.unstable_batchedUpdates(() => {
      requestOpenChange({
        event,
        value,
        open: itemType === 'branch' && !openItems.has(value),
        type,
        target: event.currentTarget,
      });
      requestNavigation({ event, value, target: event.currentTarget, type: treeDataTypes.Click });
    });
  };

  const handleTreeItemKeyDown = ({
    event,
    type,
    value,
    itemType,
  }: Exclude<TreeItemRequest, { type: 'Click' | 'ExpandIconClick' }>) => {
    const open = openItems.has(value);
    switch (type) {
      case treeDataTypes.ArrowRight:
        if (itemType === 'leaf') {
          return;
        }
        if (!open) {
          return requestOpenChange({
            event,
            value,
            open: true,
            type: treeDataTypes.ArrowRight,
            target: event.currentTarget,
          });
        }
        return requestNavigation({ event, value, type, target: event.currentTarget });
      case treeDataTypes.Enter:
        return requestOpenChange({
          event,
          value,
          open: itemType === 'branch' && !open,
          type: treeDataTypes.Enter,
          target: event.currentTarget,
        });
      case treeDataTypes.ArrowLeft:
        if (open && itemType === 'branch') {
          return requestOpenChange({
            event,
            value,
            open: false,
            type: treeDataTypes.ArrowLeft,
            target: event.currentTarget,
          });
        }
        return requestNavigation({ event, value, target: event.currentTarget, type: treeDataTypes.ArrowLeft });
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.ArrowDown:
      case treeDataTypes.TypeAhead:
        return requestNavigation({ event, value, type, target: event.currentTarget });
    }
  };

  const requestTreeResponse = useEventCallback((request: TreeItemRequest) => {
    switch (request.event.type) {
      case 'click':
        // casting is required here as we're narrowing down the event to only click events
        return handleTreeItemClick(request as Extract<TreeItemRequest, { type: 'Click' | 'ExpandIconClick' }>);
      case 'keydown':
        // casting is required here as we're narrowing down the event to only keyboard events
        return handleTreeItemKeyDown(request as Exclude<TreeItemRequest, { type: 'Click' | 'ExpandIconClick' }>);
    }
  });

  return {
    components: {
      root: 'div',
    },
    open: true,
    appearance,
    size,
    selection,
    level: 1,
    openItems,
    requestTreeResponse,
    root: getNativeElementProps('div', {
      ref: useMergedRefs(navigationRef, ref),
      role: 'tree',
      ...props,
    }),
  };
}

function warnIfNoProperPropsRootTree(props: Pick<TreeProps, 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn('Tree must have either a `aria-label` or `aria-labelledby` property defined');
    }
  }
}
