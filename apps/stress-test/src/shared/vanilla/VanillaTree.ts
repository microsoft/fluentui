import { TreeNode } from '../tree/RandomTree';

export type VanillaTreeItemRenderer<T> = (node: T, depth: number, index: number) => HTMLElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderVanillaTree = <T extends TreeNode<any>>(
  tree: T,
  itemRenderer: VanillaTreeItemRenderer<T>,
  depth: number = 0,
  index: number = 0,
): HTMLElement => {
  const root = document.createElement('div');
  root.classList.add('vanilla-tree-node');

  root.appendChild(itemRenderer(tree, depth, index));

  tree.children.forEach((child, i) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const node = renderVanillaTree(child, itemRenderer, depth + 1, i + 1);
    root.appendChild(node);
  });

  return root;
};
