import * as React from 'react';
import { SelectionMode, getNativeElementProps, slot, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import type {
  TreeCheckedChangeData,
  TreeNavigationData_unstable,
  TreeOpenChangeData,
  TreeProps,
  TreeState,
} from './Tree.types';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import { createNextNestedCheckedItems, useNestedCheckedItems } from '../../hooks/useNestedControllableCheckedItems';
import { TreeItemRequest } from '../../contexts/treeContext';
import { HTMLElementWalker, createHTMLElementWalker } from '../../utils/createHTMLElementWalker';
import { treeItemFilter } from '../../utils/treeItemFilter';
import { useNestedTreeNavigation } from '../../hooks/useNestedTreeNavigation';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';
import { treeDataTypes } from '../../utils/tokens';
import { useSubtreeContext_unstable } from '../../contexts';

export const useTree_unstable = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const { level } = useSubtreeContext_unstable();
  // as level is static, this doesn't break rule of hooks
  // and if this becomes an issue later on, this can be easily converted
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return level > 0 ? useNestedSubtree(props, ref) : useNestedRootTree(props, ref);
};

function useNestedSubtree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  const subtreeRef = useTreeItemContext_unstable(ctx => ctx.subtreeRef);
  const open = useTreeItemContext_unstable(ctx => ctx.open) ?? false;

  const { level: parentLevel } = useSubtreeContext_unstable();
  return {
    open,
    contextType: 'subtree',
    components: {
      root: 'div',
    },
    level: parentLevel + 1,
    root: slot.always(
      getNativeElementProps('div', {
        ref: useMergedRefs(ref, subtreeRef),
        role: 'group',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}

function useNestedRootTree(props: TreeProps, ref: React.Ref<HTMLElement>): TreeState {
  warnIfNoProperPropsRootTree(props);
  const { appearance = 'subtle', size = 'medium', selectionMode = 'none' } = props;

  const [openItems, setOpenItems] = useControllableOpenItems(props);
  const checkedItems = useNestedCheckedItems(props);
  const { navigate, initialize } = useNestedTreeNavigation();
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

  const requestCheckedChange = (data: TreeCheckedChangeData) => {
    if (walkerRef.current) {
      const nextCheckedItems = createNextNestedCheckedItems(data, checkedItems);
      props.onCheckedChange?.(data.event, {
        ...data,
        checkedItems: nextCheckedItems.dangerouslyGetInternalMap_unstable(),
      });
    }
  };

  const requestNavigation = (data: TreeNavigationData_unstable) => {
    props.onNavigation?.(data.event, data);
    if (data.preventInternals) {
      return;
    }
    if (walkerRef.current) {
      navigate(data, walkerRef.current);
    }
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
    treeType: 'nested',
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
        @fluentui/react-tree [useTree]:
        Tree must have either a \`aria-label\` or \`aria-labelledby\` property defined.
      `);
    }
  }
}
