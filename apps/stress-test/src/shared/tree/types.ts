export type Attribute = {
  key: string;
  value: string | undefined;
  selector: string;
};

export type RandomSelectorTreeNode = {
  name: string;
  classNames: string[];
  attributes: Attribute[];
  siblings: string[];
  pseudos: string[];
};

export type SelectorTreeNode = TreeNode<RandomSelectorTreeNode>;

export type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
  parent: TreeNode<T> | null;
};

export type TreeNodeCreateCallback<T> = (parent: TreeNode<T> | null, depth: number, breath: number) => TreeNode<T>;
export type TreeNodeVisitCallback<T> = (node: TreeNode<T>) => void;
