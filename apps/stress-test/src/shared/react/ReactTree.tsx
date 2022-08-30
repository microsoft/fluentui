import * as React from 'react';
import { TreeNode } from '../tree/RandomTree';

export type ReactTreeItemRenderer<T> = (node: T, depth: number, index: number) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactTreeProps<T extends TreeNode<any>> = {
  tree: T;
  itemRenderer: ReactTreeItemRenderer<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactTreeNodeProps<T extends TreeNode<any>> = {
  root: T;
  renderer: ReactTreeItemRenderer<T>;
  depth?: number;
  index?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactTreeNode = <T extends TreeNode<any>>(props: ReactTreeNodeProps<T>): JSX.Element => {
  const { root, renderer, depth = 0, index = 0, ...others } = props;

  return (
    <div className="react-tree-node" {...others}>
      {renderer(root, depth, index)}
      {root.children.map((child, i) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <ReactTreeNode root={child} key={i} renderer={renderer} depth={depth + 1} index={i + 1} />;
      })}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactTree = <T extends TreeNode<any>>({ tree, itemRenderer }: ReactTreeProps<T>): JSX.Element => {
  return <ReactTreeNode root={tree} renderer={itemRenderer} />;
};
