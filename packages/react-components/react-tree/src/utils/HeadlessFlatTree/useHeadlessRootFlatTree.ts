import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import * as React from 'react';
import { HeadlessTreeItemProps, createDisassociatedHeadlessTreeItem, createHeadlessTree } from '../HeadlessTree';
import { dataTreeItemValueAttrName, treeDataTypes } from '../tokens';
import { useFlatTreeNavigation } from '../../hooks/useFlatTreeNavigation';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import {
  createNextFlatCheckedItems,
  useFlatControllableCheckedItems,
} from '../../hooks/useFlatControllableCheckedItems';
import {
  TreeCheckedChangeData,
  TreeCheckedChangeEvent,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '../../components/Tree/Tree.types';
import { HTMLElementWalker, createHTMLElementWalker } from '../createHTMLElementWalker';
import { treeItemFilter } from '../treeItemFilter';
import { HeadlessRootFlatTree, HeadlessRootFlatTreeOptions } from './types';

/**
 * this hook provides FlatTree API to manage all required mechanisms to convert a list of items into renderable TreeItems
 * in multiple scenarios including virtualization.
 *
 * !!A flat tree is an unofficial spec for tree!!
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 * On simple scenarios it is advised to simply use a nested structure instead.
 *
 * @param props - a list of tree items
 * @param options - in case control over the internal openItems is required
 */
export function useHeadlessRootFlatTree_unstable<Props extends HeadlessTreeItemProps = HeadlessTreeItemProps>(
  props: Props[],
  options: HeadlessRootFlatTreeOptions = {},
): HeadlessRootFlatTree<Props> {
  const treeRef = React.useRef<HTMLDivElement>(null);
  const headlessTree = React.useMemo(() => createHeadlessTree(props), [props]);

  const [openItems, setOpenItems] = useControllableOpenItems(options);
  const [checkedItems, setCheckedItems] = useFlatControllableCheckedItems(options, headlessTree);
  const { initialize, navigate } = useFlatTreeNavigation();
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

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    options.onOpenChange?.(event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
    setOpenItems(nextOpenItems);
  });

  const handleCheckedChange = useEventCallback((event: TreeCheckedChangeEvent, data: TreeCheckedChangeData) => {
    const nextCheckedItems = createNextFlatCheckedItems(data, checkedItems, headlessTree);
    options.onCheckedChange?.(event, {
      ...data,
      checkedItems: nextCheckedItems.dangerouslyGetInternalMap_unstable(),
    });
    setCheckedItems(nextCheckedItems);
  });

  const handleNavigation = useEventCallback(
    (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
      const item = headlessTree.get(data.value);
      options.onNavigation?.(event, data);
      if (walkerRef.current && item && !data.preventInternals) {
        navigate(data, walkerRef.current);
        data.preventInternals = true;
      }
    },
  );

  const ref = useMergedRefs<HTMLDivElement>(treeRef, initializeWalker);

  return React.useMemo<HeadlessRootFlatTree<Props>>(
    () => ({
      navigate: data => {
        if (walkerRef.current) {
          navigate(data, walkerRef.current);
        }
      },
      getTreeItem: value => {
        let item = headlessTree.get(value);
        if (!item) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.error(/* #__DE-INDENT__ */ `
              @fluentui/react-tree [useHeadlessFlatTree]:
              Tree item with value "${value}" was not found.
              Make sure you're registering the tree item with value "${value}".
              You can register it by passing it as a parameter to the useHeadlessFlatTree hook.
            `);
          }
          item = createDisassociatedHeadlessTreeItem({ value });
        }
        return item;
      },
      getTreeProps: () => ({
        ref,
        openItems,
        selectionMode: options.selectionMode,
        checkedItems,
        onOpenChange: handleOpenChange,
        onCheckedChange: handleCheckedChange,
        onNavigation: handleNavigation,
      }),
      isOpen: value => openItems.has(value),
      getNextNavigableItem: (visibleItems, data) => {
        const item = headlessTree.get(data.value);
        if (item) {
          switch (data.type) {
            case treeDataTypes.TypeAhead:
              return item;
            case treeDataTypes.ArrowLeft:
              return headlessTree.get(item.parentValue!);
            case treeDataTypes.ArrowRight:
              return visibleItems[item.index + 1];
            case treeDataTypes.End:
              return visibleItems[visibleItems.length - 1];
            case treeDataTypes.Home:
              return visibleItems[0];
            case treeDataTypes.ArrowDown:
              return visibleItems[item.index + 1];
            case treeDataTypes.ArrowUp:
              return visibleItems[item.index - 1];
          }
        }
      },
      getElementFromItem: item => {
        return treeRef.current?.querySelector(`[${dataTreeItemValueAttrName}="${item.value}"]`) as HTMLElement | null;
      },
      items: value => headlessTree.visibleItems(openItems, value),
    }),
    [
      headlessTree,
      openItems,
      checkedItems,
      ref,
      handleOpenChange,
      handleCheckedChange,
      handleNavigation,
      navigate,
      options.selectionMode,
    ],
  );
}
