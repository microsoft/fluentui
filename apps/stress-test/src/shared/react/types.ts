import { TestOptions } from '../utils/testOptions';
import { RandomSelectorTreeNode, SelectorTreeNode } from '../tree/RandomSelectorTreeNode';
import { TreeNode } from '../tree/RandomTree';

export type ReactSelectorTreeComponentRenderer = (node: SelectorTreeNode, depth: number, index: number) => JSX.Element;

export type TestProps = {
  componentRenderer: ReactSelectorTreeComponentRenderer;
  tree: TreeNode<RandomSelectorTreeNode>;
  selectors: string[];
  testOptions: TestOptions;
};
