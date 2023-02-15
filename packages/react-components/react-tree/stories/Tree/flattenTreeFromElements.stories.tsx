import * as React from 'react';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  useFlatTreeItems_unstable,
  flattenTreeFromElements_unstable,
} from '@fluentui/react-tree';

const defaultItems = flattenTreeFromElements_unstable(
  <>
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
  </>,
);

export const FlattenTreeFromElements = () => {
  const [treeProps, getTreeItems] = useFlatTreeItems_unstable(defaultItems);
  return (
    <Tree {...treeProps} aria-label="Tree">
      {getTreeItems().map((treeItemProps, index) => (
        <TreeItem {...treeItemProps} key={index} />
      ))}
    </Tree>
  );
};
