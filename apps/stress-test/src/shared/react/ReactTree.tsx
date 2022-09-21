import * as React from 'react';
import { TreeNode } from '../tree/RandomTree';

export type ReactTreeItemRenderer<T> = (node: T, depth: number, index: number) => JSX.Element;

export type ReactTreeProps<T extends TreeNode<unknown>> = {
  tree: T;
  itemRenderer: ReactTreeItemRenderer<T>;
};

export type ReactTreeNodeProps<T extends TreeNode<unknown>> = {
  root: T;
  renderer: ReactTreeItemRenderer<T>;
  depth?: number;
  index?: number;
};

export const ReactTreeNode = <T extends TreeNode<unknown>>(props: ReactTreeNodeProps<T>): JSX.Element => {
  const { root, renderer, depth = 0, index = 0, ...others } = props;

  return (
    <div className="react-tree-node" {...others}>
      {renderer(root, depth, index)}
      {root.children.map((child, i) => {
        return <ReactTreeNode root={child as T} key={i} renderer={renderer} depth={depth + 1} index={i + 1} />;
      })}
    </div>
  );
};

export const ReactTree = <T extends TreeNode<unknown>>({ tree, itemRenderer }: ReactTreeProps<T>): JSX.Element => {
  return <ReactTreeNode root={tree} renderer={itemRenderer} />;
};
