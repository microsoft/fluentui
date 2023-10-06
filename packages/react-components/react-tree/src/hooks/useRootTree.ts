import { SelectionMode, getIntrinsicElementProps, useEventCallback, slot } from '@fluentui/react-utilities';
import type {
  TreeCheckedChangeData,
  TreeNavigationData_unstable,
  TreeOpenChangeData,
  TreeProps,
  TreeState,
} from '../Tree';
import * as React from 'react';
import { TreeContextValue, TreeItemRequest } from '../contexts/treeContext';
import { createOpenItems } from '../utils/createOpenItems';
import { createCheckedItems } from '../utils/createCheckedItems';
import { treeDataTypes } from '../utils/tokens';
import { createNextOpenItems } from './useControllableOpenItems';

/**
 * Create the state required to render the root level tree.
 *
 * @param props - props from this instance of tree
 * @param ref - reference to root HTMLElement of tree
 */
export function useRootTree(
  props: TreeProps,
  ref: React.Ref<HTMLElement>,
): Omit<TreeState & TreeContextValue, 'treeType'> {
  warnIfNoProperPropsRootTree(props);

  const { appearance = 'subtle', size = 'medium', selectionMode = 'none' } = props;

  const openItems = React.useMemo(() => createOpenItems(props.openItems), [props.openItems]);
  const checkedItems = React.useMemo(() => createCheckedItems(props.checkedItems), [props.checkedItems]);
  const requestOpenChange = (data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    props.onOpenChange?.(data.event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
  };

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
    switch (request.requestType) {
      case 'navigate':
        return requestNavigation(request);
      case 'open':
        return requestOpenChange({
          ...request,
          open: request.itemType === 'branch' && !openItems.has(request.value),
          openItems: openItems.dangerouslyGetInternalSet_unstable(),
        });
      case 'selection':
        return requestCheckedChange({
          ...request,
          selectionMode: selectionMode as SelectionMode,
          checkedItems: checkedItems.dangerouslyGetInternalMap_unstable(),
        } as TreeCheckedChangeData);
    }
  });

  return {
    components: {
      root: 'div',
    },
    contextType: 'root',
    selectionMode,
    open: true,
    appearance,
    size,
    level: 1,
    openItems,
    checkedItems,
    requestTreeResponse,
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
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
