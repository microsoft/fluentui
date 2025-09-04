import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout, TreeItemProps } from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type CustomTreeItemProps = TreeItemProps & { children?: React.ReactNode };

const CustomTreeItem = ({ children, ...props }: CustomTreeItemProps) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  // same items to be used between contextmenu and actions
  const commonMenuItems = (
    <>
      <MenuItem>New </MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem disabled>Open File</MenuItem>
      <MenuItem>Open Folder</MenuItem>
    </>
  );

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>{commonMenuItems}</MenuList>
                  </MenuPopover>
                </Menu>
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Edit</MenuItem>
          {commonMenuItems}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NavigationModeTreeGrid = (): JSXElement => {
  return (
    <Tree navigationMode="treegrid" aria-label="Actions">
      <CustomTreeItem itemType="branch">
        item 1
        <Tree>
          <CustomTreeItem itemType="branch">
            item 1-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 1-1-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-2</CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-3</CustomTreeItem>
        </Tree>
      </CustomTreeItem>
      <CustomTreeItem itemType="branch">
        item 2
        <Tree>
          <CustomTreeItem itemType="branch">
            item 2-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 2-1-1</CustomTreeItem>
            </Tree>
          </CustomTreeItem>

          <CustomTreeItem itemType="branch">
            item 3
            <Tree>
              <CustomTreeItem itemType="leaf">item 3-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
        </Tree>
      </CustomTreeItem>
    </Tree>
  );
};

NavigationModeTreeGrid.parameters = {
  docs: {
    description: {
      story: `
If \`navigationMode\` is set to \`treegrid\`, the navigation pattern changes to allow navigation between tree items and their actions.

1. If the treeitem is a branch and it's not expanded, pressing right arrow key will expand the treeitem.
2. If the treeitem is a branch and it's expanded, pressing right arrow key will navigate towards the actions of the treeitem.
3. If focused in the actions, pressing left arrow key will navigate back to the treeitem.
`,
    },
  },
};
