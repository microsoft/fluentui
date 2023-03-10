import { RandomSelectorTreeNode, SelectorTreeNode, TreeNode } from '../tree/types';
import { TestOptions } from '../utils/testOptions';

export type ReactSelectorTreeComponentRenderer = (node: SelectorTreeNode, depth: number, index: number) => JSX.Element;

export type TestProps = {
  componentRenderer: ReactSelectorTreeComponentRenderer;
  tree: TreeNode<RandomSelectorTreeNode>;
  selectors: string[];
  testOptions: TestOptions;
};
