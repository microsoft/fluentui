import * as React from 'react';
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

type CustomTreeItemProps = TreeItemProps;

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

export const Actions = () => {
  return (
    <Tree aria-label="Actions">
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

Actions.parameters = {
  docs: {
    description: {
      story: `
In addition to \`aside\` slot, both tree item layouts support \`actions\` slot that can be used for tasks such as edit, rename, or triggering a menu.
\`actions\` and \`aside\` slots are positioned on the exact same spot, so they won't be visible at the same time. \`aside\` slot is visible by default meanwhile \`actions\` slot are only visible when the tree item is active (by hovering or by navigating to it). \`actions\` slot supports a \`visible\` prop to force visibility of the actions.

The \`actions\` slot has a \`role="toolbar"\` and ensures proper horizontal navigation with the keyboard by using [\`useArrowNavigationGroup\`](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--default).

> ⚠️ Although \`actions\` are easy to navigate, they're not an expected pattern according to [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).providing a context menu with the same functionalities as the actions is recommended to ensure your tree item is accessible.

In the example below, we compose on top of \`TreeItem\` component to include both a context menu and actions that provide the same amount of functionalities. We also provide an \`aria-description\` to the tree item to indicate that it has actions. This is a new behavior that the user might not be aware of, so you might need to explain somewhere else in the UI what does having actions refers to.

> ⚠️ Don't forget to add a proper description to \`TreeItem\` to ensure screen readers have enough information to understand the context

> ⚠️ Actions are still experimental and user experience might change in the future.
`,
    },
  },
};
