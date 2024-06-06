import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-components';

export const OpenItemControlled = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpenChange = (event: TreeItemOpenChangeEvent, data: TreeItemOpenChangeData) => {
    setOpen(data.open);
  };
  return (
    <Tree aria-label="Open Item Controlled">
      <TreeItem open={open} onOpenChange={handleOpenChange} itemType="branch" value="tree-item-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

OpenItemControlled.parameters = {
  docs: {
    description: {
      story: `
You can also control the open/closed state of a single \`TreeItem\` component directly. This will override the internal value of \`openItems\` in favor of the \`open\` property.

> Note: It's not recommended to use both \`openItems\` and \`open\` at the same time, as this can lead to unexpected behavior! Stick to one or the other.
      `,
    },
  },
};
