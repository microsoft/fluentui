import * as React from 'react';
import {
  ExtractSlotProps,
  SelectionMode,
  getNativeElementProps,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { FlatTreeProps, FlatTreeSlots, FlatTreeState } from './FlatTree.types';
import { TreeItemRequest, defaultTreeContextValue, useSubtreeContext_unstable } from '../../contexts/index';
import type { TreeCheckedChangeData, TreeNavigationData_unstable, TreeOpenChangeData } from '../Tree/Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { useFlatTreeNavigation } from '../../hooks/useFlatTreeNavigation';
import { HTMLElementWalker, createHTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { createCheckedItems } from '../../utils/createCheckedItems';
import { treeDataTypes } from '../../utils/tokens';

export const useFlatTree_unstable: (props: FlatTreeProps, ref: React.Ref<HTMLElement>) => FlatTreeState = (
  props,
  ref,
) => {
  const { level } = useSubtreeContext_unstable();
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return level > 1 ? useSubFlatTree(props, ref) : useRootFlatTree(props, ref);
};

function useRootFlatTree(props: FlatTreeProps, ref: React.Ref<HTMLElement>): FlatTreeState {
  const { appearance = 'subtle', size = 'medium', selectionMode = 'none' } = props;
  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = React.useMemo(() => createCheckedItems(props.checkedItems), [props.checkedItems]);
  const { navigate, initialize } = useFlatTreeNavigation();
  const walkerRef = React.useRef<HTMLElementWalker>();
  const { targetDocument } = useFluent_unstable();
  const initializeWalker = React.useCallback(
    (root: HTMLElement | null) => {
      if (root && targetDocument) {
        walkerRef.current = createHTMLElementWalker(root, targetDocument, treeItemFilter);
        initialize(walkerRef.current);
      }
    },
    [initialize, targetDocument],
  );

  const requestOpenChange = (data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    props.onOpenChange?.(data.event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
    setOpenItems(nextOpenItems);
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
    if (!data.preventInternals && walkerRef.current) {
      navigate(data, walkerRef.current);
    }
  };

  const requestTreeResponse = useEventCallback((request: TreeItemRequest) => {
    switch (request.requestType) {
      case 'open':
        return requestOpenChange({
          ...request,
          open: request.itemType === 'branch' && !openItems.has(request.value),
          openItems: openItems.dangerouslyGetInternalSet_unstable(),
        });
      case 'navigate':
        return requestNavigation({ ...request, preventInternals: false });
      case 'selection':
        return requestCheckedChange({
          ...request,
          selectionMode: selectionMode as SelectionMode,
          checkedItems: checkedItems.dangerouslyGetInternalMap_unstable(),
        } as TreeCheckedChangeData);
    }
  });

  return {
    treeType: 'flat',
    contextType: 'root',
    components: {
      root: 'div',
    },
    level: 1,
    selectionMode,
    open: true,
    appearance,
    size,
    openItems,
    checkedItems,
    requestTreeResponse,
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, initializeWalker),
        role: 'tree',
        'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        ...props,
        'aria-setsize': undefined,
      }),
      { elementType: 'div' },
    ),
  };
}

function useSubFlatTree(props: FlatTreeProps, ref: React.Ref<HTMLElement>): FlatTreeState {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(/* #__DE-INDENT__ */ `
      @fluentui/react-tree [useFlatTree]:
      Subtrees are not allowed in a FlatTree!
      You cannot use a <FlatTree> component inside of another <FlatTree> component.
    `);
  }
  return {
    ...defaultTreeContextValue,
    open: false,
    contextType: 'root',
    treeType: 'flat',
    components: { root: React.Fragment },
    root: slot.always<ExtractSlotProps<FlatTreeSlots['root']>>(undefined, { elementType: React.Fragment }),
  };
}
