import { TreeNode } from '../tree/types';

export type VanillaTreeItemRenderer<T> = (node: T, depth: number, index: number) => HTMLElement;

export const renderVanillaTree = <T extends TreeNode<unknown>>(
  tree: T,
  itemRenderer: VanillaTreeItemRenderer<T>,
  depth: number = 0,
  index: number = 0,
): HTMLElement => {
  const root = document.createElement('div');
  root.classList.add('vanilla-tree-node');

  const { value } = tree;

  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  root.classList.add(...value.classNames.map(cn => cn.substring(1)));
  // @ts-ignore
  value.attributes.forEach(attr => {
    root.setAttribute(attr.key, attr.value ?? '');
  });

  root.appendChild(itemRenderer(tree, depth, index));

  tree.children.forEach((child, i) => {
    const node = renderVanillaTree(child as T, itemRenderer, depth + 1, i + 1);
    root.appendChild(node);
  });

  return root;
};
