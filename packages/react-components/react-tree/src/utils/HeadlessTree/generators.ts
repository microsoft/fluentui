import type { TreeItemValue } from '../../TreeItem';
import type { HeadlessTree, HeadlessTreeItem, HeadlessTreeItemProps } from './types';

/**
 * Generator that returns all subtree of a given virtual tree item
 * @param key the key of the item to get the subtree from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function* HeadlessTreeSubtreeGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  const item = virtualTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return;
  }
  for (const childValue of item.childrenValues) {
    yield virtualTreeItems.get(childValue)!;
    yield* HeadlessTreeSubtreeGenerator(childValue, virtualTreeItems);
  }
}

/**
 * Generator that returns all children of a given virtual tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function* HeadlessTreeChildrenGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  const item = virtualTreeItems.get(key);
  if (!item || item.childrenValues.length === 0) {
    return;
  }
  for (const childValue of item.childrenValues) {
    yield virtualTreeItems.get(childValue)!;
  }
}

/**
 * Generator that returns all ancestors of a given virtual tree item
 * @param key the key of the item to get the children from
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function* HeadlessTreeAncestorsGenerator<Props extends HeadlessTreeItemProps>(
  key: TreeItemValue,
  virtualTreeItems: HeadlessTree<Props>,
): Generator<HeadlessTreeItem<Props>, void, void> {
  let parent = virtualTreeItems.getParent(key);
  while (parent !== virtualTreeItems.root) {
    yield parent;
    parent = virtualTreeItems.getParent(parent.value);
  }
}

/**
 * Generator that returns all visible items of a given virtual tree
 * @param openItems the open items of the tree
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function* HeadlessTreeVisibleItemsGenerator<Props extends HeadlessTreeItemProps>(
  value: Props['value'],
  virtualTreeItems: HeadlessTree<Props>,
  isVisible: (item: HeadlessTreeItem<Props>) => boolean,
): Generator<HeadlessTreeItem<Props>, void, void> {
  let index = 0;
  for (const item of HeadlessTreeSubtreeGenerator(value, virtualTreeItems)) {
    if (isVisible(item)) {
      item.index = index++;
      yield item;
    }
  }
}
