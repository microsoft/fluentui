import * as React from 'react';
import { TreeNode } from '../tree/types';
import { ReactTree } from './ReactTree';
import { RandomSelectorTreeNode, SelectorTreeNode } from '../tree/types';
import { ReactSelectorTreeComponentRenderer } from './types';

type ReactSelectorTreeProps = {
  tree?: TreeNode<RandomSelectorTreeNode>;
  componentRenderer: ReactSelectorTreeComponentRenderer;
};

const buildRenderer = (componentRenderer: ReactSelectorTreeComponentRenderer) => {
  const renderer = (node: SelectorTreeNode, depth: number, index: number): JSX.Element => {
    const { value } = node;

    const className = value.classNames.map(cn => cn.substring(1)).join(' ');
    const attrs = value.attributes.reduce((map, attr) => {
      map[attr.key] = attr.value ?? '';
      return map;
    }, {} as { [key: string]: string });

    return (
      <div className={className} {...attrs} style={{ marginLeft: `${depth * 10}px` }}>
        {componentRenderer(node, depth, index)}
      </div>
    );
  };

  return renderer;
};
export const ReactSelectorTree: React.FC<ReactSelectorTreeProps> = ({ tree, componentRenderer }) => {
  return <>{tree ? <ReactTree tree={tree} itemRenderer={buildRenderer(componentRenderer)} /> : null}</>;
};
