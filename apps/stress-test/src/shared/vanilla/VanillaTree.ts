import { TreeNode } from '../tree/RandomTree';

export type VanillaTreeItemRenderer<T> = (node: T, depth: number, index: number) => HTMLElement;

export const renderVanillaTree = <T extends TreeNode<unknown>>(
  tree: T,
  itemRenderer: VanillaTreeItemRenderer<T>,
  depth: number = 0,
  index: number = 0,
): HTMLElement => {
  const root = document.createElement('div');
  root.classList.add('vanilla-tree-node');

  root.appendChild(itemRenderer(tree, depth, index));

  tree.children.forEach((child, i) => {
    const node = renderVanillaTree(child as T, itemRenderer, depth + 1, i + 1);
    root.appendChild(node);
  });

  return root;
};
