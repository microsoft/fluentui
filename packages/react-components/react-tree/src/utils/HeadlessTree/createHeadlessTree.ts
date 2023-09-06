import type { TreeItemValue } from '../../TreeItem';
import { ImmutableSet } from '../ImmutableSet';
import { headlessTreeRootId } from '../tokens';
import {
  HeadlessTreeAncestorsGenerator,
  HeadlessTreeChildrenGenerator,
  HeadlessTreeSubtreeGenerator,
  HeadlessTreeVisibleItemsGenerator,
} from './generators';
import type { GetTreeItemPropsReturnType, HeadlessTree, HeadlessTreeItem, HeadlessTreeItemProps } from './types';

/**
 * creates a list of virtual tree items
 * and provides a map to access each item by id
 */
export function createHeadlessTree<Props extends HeadlessTreeItemProps>(
  initialProps: Props[] = [],
  root: HeadlessTreeItem<Props> = createDisassociatedHeadlessTreeItem(),
): HeadlessTree<Props> {
  const itemsPerValue = new Map<TreeItemValue, HeadlessTreeItem<Props>>([[root.value, root]]);

  const headlessTree: HeadlessTree<HeadlessTreeItemProps> = {
    root,
    get size() {
      return itemsPerValue.size;
    },
    getParent: key => itemsPerValue.get(itemsPerValue.get(key)?.parentValue ?? root.value) ?? root,
    get: key => itemsPerValue.get(key),
    has: key => itemsPerValue.has(key),
    add(props) {
      const { parentValue = root.value, ...propsWithoutParentValue } = props;
      const parentItem = itemsPerValue.get(parentValue);
      if (!parentItem) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(/* #__DE-INDENT__ */ `
            @fluentui/react-tree [useHeadlessFlatTree]:
            Item ${props.value} is wrongly positioned, did you properly ordered provided item props?
            Make sure provided items are organized, parents should come before children.
          `);
        }
        return;
      }
      parentItem.itemType = 'branch';

      const item: HeadlessTreeItem<Props> = {
        value: props.value,
        getTreeItemProps: () =>
          ({
            ...propsWithoutParentValue,
            'aria-level': item.level,
            'aria-posinset': item.position,
            'aria-setsize': parentItem.childrenValues.length,
            itemType: item.itemType,
            parentValue: item.parentValue,
          } as GetTreeItemPropsReturnType<Props>),
        itemType: propsWithoutParentValue.itemType ?? 'leaf',
        level: parentItem.level + 1,
        parentValue,
        childrenValues: [],
        index: -1,
        position: parentItem.childrenValues.push(props.value),
      };
      itemsPerValue.set(item.value, item);
    },
    subtree: key => HeadlessTreeSubtreeGenerator(key, headlessTree),
    children: key => HeadlessTreeChildrenGenerator(key, headlessTree),
    ancestors: key => HeadlessTreeAncestorsGenerator(key, headlessTree),
    visibleItems: (openItems, value) =>
      HeadlessTreeVisibleItemsGenerator(value ?? headlessTree.root.value, headlessTree, item =>
        isItemVisible(item, openItems, headlessTree),
      ),
  };

  initialProps.forEach(headlessTree.add);

  return headlessTree as HeadlessTree<Props>;
}

export function createDisassociatedHeadlessTreeItem<Props extends HeadlessTreeItemProps>({
  value = headlessTreeRootId,
  ...partialItem
}: Partial<HeadlessTreeItem<Props>> = {}): HeadlessTreeItem<Props> {
  return {
    parentValue: undefined,
    value,
    itemType: 'branch',
    getTreeItemProps: () => {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [useHeadlessFlatTree]:
          Internal error, trying to access treeitem props from invalid disassociated element.
          item with value "${value}" was not found. Make sure the item is properly registered.
          To register an item pass the item as a prop to the "useHeadlessFlatTree" hook.
        `);
      }
      return {
        'aria-setsize': -1,
        'aria-level': -1,
        'aria-posinset': -1,
        itemType: 'branch',
        value,
      } as GetTreeItemPropsReturnType<Props>;
    },
    childrenValues: [],
    get index() {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [useHeadlessFlatTree]:
          Internal error, trying to access index from invalid disassociated element.
        `);
      }
      return -1;
    },
    get position() {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/* #__DE-INDENT__ */ `
          @fluentui/react-tree [useHeadlessFlatTree]:
          Internal error, trying to access position from invalid disassociated element.
        `);
      }
      return -1;
    },
    level: 0,
    ...partialItem,
  };
}

function isItemVisible(
  item: HeadlessTreeItem<HeadlessTreeItemProps>,
  openItems: ImmutableSet<TreeItemValue>,
  headlessTree: HeadlessTree<HeadlessTreeItemProps>,
) {
  if (item.level === 1) {
    return true;
  }
  while (item.parentValue && item.parentValue !== headlessTree.root.value) {
    if (!openItems.has(item.parentValue)) {
      return false;
    }
    const parent = headlessTree.get(item.parentValue);
    if (!parent) {
      return false;
    }
    item = parent;
  }
  return true;
}
