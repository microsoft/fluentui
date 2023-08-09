import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  useTreeContext_unstable,
  useTreeItemContext_unstable,
} from '@fluentui/react-tree-preview';

const RecursiveTreeItem: React.FC = () => {
  const level = useTreeContext_unstable(ctx => ctx.level);
  const open = useTreeItemContext_unstable(ctx => ctx.open || level === 1);
  return (
    <TreeItem value={level} itemType="branch" style={{ [treeItemLevelToken]: level }}>
      <TreeItemLayout>{`level ${level}, item 1`}</TreeItemLayout>
      {open && (
        <Tree>
          <RecursiveTreeItem />
        </Tree>
      )}
    </TreeItem>
  );
};

export const InlineStylingTreeItemLevel = () => (
  <Tree aria-label="Tree">
    <RecursiveTreeItem />
  </Tree>
);

InlineStylingTreeItemLevel.parameters = {
  docs: {
    description: {
      story: `
The tree component supports nested styling up to 10 levels, limited by performance considerations. For more than 10 levels of nesting, use dynamic styling instead. Below is an example of how to apply custom inline styles to create dynamic tree item levels, overriding the default static styles.
      `,
    },
  },
};
