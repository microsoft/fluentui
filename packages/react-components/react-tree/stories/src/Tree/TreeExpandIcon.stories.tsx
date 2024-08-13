import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';
import { AddSquare16Regular, SubtractSquare16Regular } from '@fluentui/react-icons';

export const ExpandIcon = () => {
  const [openItems, setOpenItems] = React.useState<TreeItemValue[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => (data.open ? [...curr, data.value] : curr.filter(value => value !== data.value)));
  };
  return (
    <Tree aria-label="Expand Icon" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout
          expandIcon={openItems.includes('tree-item-2') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
        >
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout
              expandIcon={openItems.includes('tree-item-3') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
            >
              level 2, item 1
            </TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout
          expandIcon={openItems.includes('tree-item-1') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
        >
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

ExpandIcon.parameters = {
  docs: {
    description: {
      story: `Both tree item layouts can have a custom expand/collapse icon.`,
    },
  },
};
