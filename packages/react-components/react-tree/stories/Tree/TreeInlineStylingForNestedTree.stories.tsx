import * as React from 'react';
import {
  Tree,
  TreeItem as BaseTreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  TreeItemProps,
  useTreeContext_unstable,
} from '@fluentui/react-tree';

const SHOW_MAX_LEVELS = 12;

const TreeItem = (props: TreeItemProps) => {
  const level = useTreeContext_unstable(ctx => ctx.level);
  return <BaseTreeItem {...props} style={{ [treeItemLevelToken]: level }} />;
};

const renderTree = (level: number, maxLevel: number) =>
  level > maxLevel ? (
    <TreeItem itemType="leaf">
      <TreeItemLayout>{`level ${level}, item 1`}</TreeItemLayout>
    </TreeItem>
  ) : (
    <TreeItem itemType="branch">
      <TreeItemLayout>{`level ${level}, item 1`}</TreeItemLayout>
      <Tree>{renderTree(level + 1, maxLevel)}</Tree>
    </TreeItem>
  );

export const InlineStylingForNestedTree = () => {
  return <Tree aria-label="Tree">{renderTree(1, SHOW_MAX_LEVELS)}</Tree>;
};

InlineStylingForNestedTree.parameters = {
  docs: {
    description: {
      story:
        'The tree component supports nested styling up to 10 levels, limited by performance considerations. For more than 10 levels of nesting, use dynamic styling instead. Below is an example of how to apply custom inline styles to tree items, overriding the default static styles.',
    },
  },
};
