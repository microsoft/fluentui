import * as React from 'react';
import {
  Tree,
  TreeItem as BaseTreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  TreeItemProps,
  useTreeContext_unstable,
} from '@fluentui/react-tree';
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  level1: {
    [treeItemLevelToken]: 1,
  },
  level2: {
    [treeItemLevelToken]: 2,
  },
  level3: {
    [treeItemLevelToken]: 3,
  },
});

const TreeItem = (props: TreeItemProps) => {
  const styles = useStyles();
  const level = useTreeContext_unstable(ctx => ctx.level);
  return (
    <BaseTreeItem
      {...props}
      style={{ [treeItemLevelToken]: undefined, ...props.style }}
      className={mergeClasses(styles[`level${level}` as `level${1 | 2 | 3}`], props.className)}
    />
  );
};

export const WithoutInlineStyle = () => {
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
