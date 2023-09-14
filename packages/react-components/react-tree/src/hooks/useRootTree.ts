import { SelectionMode, getNativeElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type {
  TreeCheckedChangeData,
  TreeNavigationData_unstable,
  TreeOpenChangeData,
  TreeProps,
  TreeState,
} from '../Tree';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TreeItemRequest } from '../contexts/treeContext';
import { createOpenItems } from '../utils/createOpenItems';
import { createCheckedItems } from '../utils/createCheckedItems';
import { treeDataTypes } from '../utils/tokens';

/**
 * Create the state required to render the root level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useRootTree(
  props: Pick<
    TreeProps,
    | 'selectionMode'
    | 'appearance'
    | 'size'
    | 'openItems'
    | 'checkedItems'
    | 'onOpenChange'
    | 'onCheckedChange'
    | 'onNavigation'
    | 'aria-label'
    | 'aria-labelledby'
  >,

  ref: React.Ref<HTMLElement>,
): TreeState {
  warnIfNoProperPropsRootTree(props);

  const { appearance = 'subtle', size = 'medium', selectionMode = 'none' } = props;

  const openItems = React.useMemo(() => createOpenItems(props.openItems), [props.openItems]);
  const checkedItems = React.useMemo(() => createCheckedItems(props.checkedItems), [props.checkedItems]);
  const requestOpenChange = (data: TreeOpenChangeData) => props.onOpenChange?.(data.event, data);

  const requestCheckedChange = (data: TreeCheckedChangeData) => props.onCheckedChange?.(data.event, data);

  const requestNavigation = (data: TreeNavigationData_unstable) => {
    props.onNavigation?.(data.event, data);
    switch (data.type) {
      case treeDataTypes.ArrowDown:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.Home:
      case treeDataTypes.End:
        // stop the default behavior of the event
        // which is to scroll the page
        data.event.preventDefault();
    }
  };

  const requestTreeResponse = useEventCallback((request: TreeItemRequest) => {
    switch (request.type) {
      case treeDataTypes.Click:
      case treeDataTypes.ExpandIconClick: {
        return ReactDOM.unstable_batchedUpdates(() => {
          requestOpenChange({
            ...request,
            open: request.itemType === 'branch' && !openItems.has(request.value),
            openItems: openItems.dangerouslyGetInternalSet_unstable(),
          });
          requestNavigation({ ...request, type: treeDataTypes.Click });
        });
      }
      case treeDataTypes.ArrowRight: {
        if (request.itemType === 'leaf') {
          return;
        }
        const open = openItems.has(request.value);
        if (!open) {
          return requestOpenChange({
            ...request,
            open: true,
            openItems: openItems.dangerouslyGetInternalSet_unstable(),
          });
        }
        return requestNavigation(request);
      }
      case treeDataTypes.Enter: {
        const open = openItems.has(request.value);
        return requestOpenChange({
          ...request,
          open: request.itemType === 'branch' && !open,
          openItems: openItems.dangerouslyGetInternalSet_unstable(),
        });
      }
      case treeDataTypes.ArrowLeft: {
        const open = openItems.has(request.value);
        if (open && request.itemType === 'branch') {
          return requestOpenChange({
            ...request,
            open: false,
            type: treeDataTypes.ArrowLeft,
            openItems: openItems.dangerouslyGetInternalSet_unstable(),
          });
        }
        return requestNavigation({ ...request, type: treeDataTypes.ArrowLeft });
      }
      case treeDataTypes.End:
      case treeDataTypes.Home:
      case treeDataTypes.ArrowUp:
      case treeDataTypes.ArrowDown:
      case treeDataTypes.TypeAhead:
        return requestNavigation({ ...request, target: request.event.currentTarget });
      case treeDataTypes.Change: {
        return requestCheckedChange({
          ...request,
          selectionMode: selectionMode as SelectionMode,
          checkedItems: checkedItems.dangerouslyGetInternalMap_unstable(),
        } as TreeCheckedChangeData);
      }
    }
  });

  return {
    components: {
      root: 'div',
    },
    selectionMode,
    open: true,
    appearance,
    size,
    level: 1,
    openItems,
    checkedItems,
    requestTreeResponse,
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        role: 'tree',
        'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}

function warnIfNoProperPropsRootTree(props: Pick<TreeProps, 'aria-label' | 'aria-labelledby'>) {
  if (process.env.NODE_ENV === 'development') {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn(/* #__DE-INDENT__ */ `
        @fluentui/react-tree [useRootTree]:
        Tree must have either a \`aria-label\` or \`aria-labelledby\` property defined
      `);
    }
  }
}
