import * as React from 'react';
import {
  Tree,
  TreeItem as BaseTreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  TreeItemProps,
  useTreeContext_unstable,
} from '@fluentui/react-tree';
import story from './TreeItemWithInlineStyle.md';

const TreeItem = (props: TreeItemProps) => {
  const level = useTreeContext_unstable(ctx => ctx.level);
  return <BaseTreeItem {...props} style={{ [treeItemLevelToken]: level }} />;
};

export const WithInlineStyle = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem>
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem>
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem>
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem>
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem>
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

WithInlineStyle.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
