import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { HeadlessTreeItemProps, createDisassociatedHeadlessTreeItem, createHeadlessTree } from '../HeadlessTree';
import { createNextOpenItems, useControllableOpenItems } from '../../hooks/useControllableOpenItems';
import type { TreeOpenChangeData, TreeOpenChangeEvent } from '../../components/Tree/Tree.types';
import { useTreeContext_unstable } from '../../contexts/index';
import type { HeadlessSubFlatTree, HeadlessSubFlatTreeOptions } from './types';

export function useHeadlessSubFlatTree_unstable<Props extends HeadlessTreeItemProps>(
  props: Props[],
  options: HeadlessSubFlatTreeOptions,
): HeadlessSubFlatTree<Props> {
  const isParentOpen = useTreeContext_unstable(ctx => ctx.openItems.has(options.rootValue));

  const headlessTree = React.useMemo(
    () =>
      createHeadlessTree(
        props,
        createDisassociatedHeadlessTreeItem<Props>({ value: options.rootValue, level: options.rootLevel }),
      ),
    [props, options.rootValue, options.rootLevel],
  );

  const [openItems, setOpenItems] = useControllableOpenItems(options);

  const handleOpenChange = useEventCallback((event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    const nextOpenItems = createNextOpenItems(data, openItems);
    options.onOpenChange?.(event, {
      ...data,
      openItems: nextOpenItems.dangerouslyGetInternalSet_unstable(),
    });
    setOpenItems(nextOpenItems);
  });

  return React.useMemo<HeadlessSubFlatTree<Props>>(
    () => ({
      items(value) {
        return headlessTree.visibleItems(openItems, value);
      },
      isOpen(value) {
        return value === options.rootValue ? isParentOpen : openItems.has(value);
      },
      getTreeProps() {
        return { openItems, onOpenChange: handleOpenChange, parentValue: options.rootValue };
      },
      getTreeItem(value) {
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
    }),
    [headlessTree, openItems, handleOpenChange, options.rootValue, isParentOpen],
  );
}
