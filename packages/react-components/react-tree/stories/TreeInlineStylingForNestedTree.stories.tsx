import * as React from 'react';
import {
  Tree,
  TreeItem as BaseTreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  TreeItemProps,
  useTreeContext_unstable,
} from '@fluentui/react-tree';

const TreeItem = (props: TreeItemProps) => {
  const level = useTreeContext_unstable(ctx => ctx.level);
  return <BaseTreeItem {...props} style={{ [treeItemLevelToken]: level }} />;
};

export const InlineStylingForNestedTree = () => {
  return (
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="branch">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
                <Tree>
                  <TreeItem itemType="branch">
                    <TreeItemLayout>level 4, item 1</TreeItemLayout>
                    <Tree>
                      <TreeItem itemType="branch">
                        <TreeItemLayout>level 5, item 1</TreeItemLayout>
                        <Tree>
                          <TreeItem itemType="branch">
                            <TreeItemLayout>level 6, item 1</TreeItemLayout>
                            <Tree>
                              <TreeItem itemType="branch">
                                <TreeItemLayout>level 7, item 1</TreeItemLayout>
                                <Tree>
                                  <TreeItem itemType="branch">
                                    <TreeItemLayout>level 8, item 1</TreeItemLayout>
                                    <Tree>
                                      <TreeItem itemType="branch">
                                        <TreeItemLayout>level 9, item 1</TreeItemLayout>
                                        <Tree>
                                          <TreeItem itemType="branch">
                                            <TreeItemLayout>level 10, item 1</TreeItemLayout>
                                            <Tree>
                                              <TreeItem itemType="branch">
                                                <TreeItemLayout>level 11, item 1</TreeItemLayout>
                                                <Tree>
                                                  <TreeItem itemType="branch">
                                                    <TreeItemLayout>level 12, item 1</TreeItemLayout>
                                                    <Tree>
                                                      <TreeItem itemType="leaf">
                                                        <TreeItemLayout>level 13, item 1</TreeItemLayout>
                                                      </TreeItem>
                                                    </Tree>
                                                  </TreeItem>
                                                </Tree>
                                              </TreeItem>
                                            </Tree>
                                          </TreeItem>
                                        </Tree>
                                      </TreeItem>
                                    </Tree>
                                  </TreeItem>
                                </Tree>
                              </TreeItem>
                            </Tree>
                          </TreeItem>
                        </Tree>
                      </TreeItem>
                    </Tree>
                  </TreeItem>
                </Tree>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

InlineStylingForNestedTree.parameters = {
  docs: {
    description: {
      story:
        'The tree component supports nested styling up to 10 levels, limited by performance considerations. For more than 10 levels of nesting, use dynamic styling instead. Below is an example of how to apply custom inline styles to tree items, overriding the default static styles.',
    },
  },
};
