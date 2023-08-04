import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeItemProps } from '@fluentui/react-tree';
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

const ActionsExample = () => {
  return (
    <>
      <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

const ActionableTreeItem = ({ children, ...rest }: TreeItemProps) => {
  const [open, setOpen] = React.useState(false);
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layout, subtree] = React.Children.toArray(children);
  return (
    <TreeItem
      onContextMenu={e => {
        if (e.isDefaultPrevented()) {
          return;
        }
        e.preventDefault();
        setOpen(true);
      }}
      {...focusTargetAttribute}
      {...rest}
    >
      <Menu open={open} positioning={'below-end'} onOpenChange={(_, data) => setOpen(data.open)} openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <TreeItemLayout actions={<ActionsExample />}>{layout}</TreeItemLayout>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>New</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      {subtree}
    </TreeItem>
  );
};

export const Actions = () => {
  return (
    <Tree aria-label="Tree">
      <ActionableTreeItem itemType="branch">
        level 1, item 1
        <Tree>
          <ActionableTreeItem itemType="branch">
            level 2, item 1
            <Tree>
              <ActionableTreeItem itemType="leaf">level 3, item 1</ActionableTreeItem>
              <ActionableTreeItem itemType="leaf">level 3, item 2</ActionableTreeItem>
            </Tree>
          </ActionableTreeItem>
          <ActionableTreeItem itemType="leaf">level 2, item 2</ActionableTreeItem>
          <ActionableTreeItem itemType="leaf">level 2, item 3</ActionableTreeItem>
        </Tree>
      </ActionableTreeItem>
      <ActionableTreeItem itemType="branch">
        level 1, item 2
        <Tree>
          <ActionableTreeItem itemType="branch">
            level 2, item 1
            <Tree>
              <ActionableTreeItem itemType="leaf">level 3, item 1</ActionableTreeItem>
            </Tree>
          </ActionableTreeItem>

          <ActionableTreeItem itemType="branch">
            level 2, item 2
            <Tree>
              <ActionableTreeItem itemType="leaf">level 2, item 1</ActionableTreeItem>
              <ActionableTreeItem itemType="leaf">level 2, item 2</ActionableTreeItem>
            </Tree>
          </ActionableTreeItem>
        </Tree>
      </ActionableTreeItem>
    </Tree>
  );
};

Actions.parameters = {
  docs: {
    description: {
      story: `In addition to \`aside\` content, both tree item layouts support \`actions\` prop that can be used for tasks such as edit, rename, or triggering a menu. These action buttons are initially hidden but are shown on hover or can be controlled by the \`visible\` property, ensuring they take priority over the \`aside\` content when needed.

> ⚠️ Note: Actions are \`aria-hidden\` by default. Always include a context menu to ensure accessibility for screen-reader users.`,
    },
  },
};
