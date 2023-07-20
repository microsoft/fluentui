import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SelectionMode, getNativeElementProps, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import {
  TreeOpenChangeData,
  TreeProps,
  TreeState,
  TreeNavigationData_unstable,
  TreeCheckedChangeData,
} from './Tree.types';
import {
  useControllableOpenItems,
  useNestedTreeNavigation,
  useNestedControllableCheckedItems,
  createNextOpenItems,
} from '../../hooks';
import { treeDataTypes } from '../../utils/tokens';
import { TreeItemRequest } from '../../contexts';

/**
 * Create the state required to render the root level Tree.
 *
 * @param props - props from this instance of Tree
 * @param ref - reference to root HTMLElement of Tree
 */
export function useRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  warnIfNoProperPropsRootTree(props);

  const { appearance = 'subtle', size = 'medium', selectionMode = 'none' } = props;

  const [openItems, setOpenItems] = useControllableOpenItems(props);

  const [checkedItems] = useNestedControllableCheckedItems(props);
  const [navigate, navigationRef] = useNestedTreeNavigation();

  const requestOpenChange = (data: TreeOpenChangeData) => {
    props.onOpenChange?.(data.event, data);
    if (data.event.isDefaultPrevented()) {
      return;
    }
    return setOpenItems(createNextOpenItems(data, openItems));
  };

  const requestCheckedChange = (data: TreeCheckedChangeData) => {
    props.onCheckedChange?.(data.event, data);
    // TODO:
    // we should implement the logic for nested tree selection
    // return setCheckedItems(checkedItems);
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

  const requestTreeResponse = useEventCallback((request: TreeItemRequest) => {
    switch (request.type) {
      case treeDataTypes.Click:
      case treeDataTypes.ExpandIconClick: {
        return ReactDOM.unstable_batchedUpdates(() => {
          requestOpenChange({ ...request, open: request.itemType === 'branch' && !openItems.has(request.value) });
          requestNavigation({ ...request, type: treeDataTypes.Click });
        });
      }
      case treeDataTypes.ArrowRight: {
        if (request.itemType === 'leaf') {
          return;
        }
        const open = openItems.has(request.value);
        if (!open) {
          return requestOpenChange({ ...request, open: true });
        }
        return requestNavigation(request);
      }
      case treeDataTypes.Enter: {
        const open = openItems.has(request.value);
        return requestOpenChange({ ...request, open: request.itemType === 'branch' && !open });
      }
      case treeDataTypes.ArrowLeft: {
        const open = openItems.has(request.value);
        if (open && request.itemType === 'branch') {
          return requestOpenChange({ ...request, open: false, type: treeDataTypes.ArrowLeft });
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
        const previousCheckedValue = checkedItems.get(request.value);
        return requestCheckedChange({
          ...request,
          selectionMode: selectionMode as SelectionMode,
          checked: previousCheckedValue === 'mixed' ? true : !previousCheckedValue,
        });
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
    root: getNativeElementProps('div', {
      ref: useMergedRefs(navigationRef, ref),
      role: 'tree',
      'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
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
