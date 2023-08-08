import * as React from 'react';
import {
  Tree,
  TreeItem as FuiTreeItem,
  TreeItemLayout,
  TreeItemProps as FuiTreeItemProps,
} from '@fluentui/react-tree-preview';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Slot,
  getSlots,
  ComponentProps,
  resolveShorthand,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type TreeItemSlots = { layout: Slot<typeof TreeItemLayout> };
type TreeItemProps = FuiTreeItemProps & ComponentProps<Partial<TreeItemSlots>>;

const TreeItem = ({ layout, children, ...props }: TreeItemProps) => {
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

  const { slots, slotProps } = getSlots<TreeItemSlots>({
    components: { layout: TreeItemLayout },
    layout: resolveShorthand(layout, {
      required: true,
      defaultProps: {
        actions: (
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
        ),
        children: layoutChildren,
      },
    }),
  });

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <FuiTreeItem aria-description="has context menu" {...focusTargetAttribute} {...props}>
          <slots.layout {...slotProps.layout} />
          {subtree}
        </FuiTreeItem>
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
    <Tree aria-label="Tree">
      <TreeItem itemType="branch">
        item 1
        <Tree>
          <TreeItem itemType="branch">
            item 1-1
            <Tree>
              <TreeItem itemType="leaf">item 1-1-1</TreeItem>
              <TreeItem itemType="leaf">item 1-1-2</TreeItem>
              <TreeItem itemType="leaf">item 1-1-3</TreeItem>
            </Tree>
          </TreeItem>
          <TreeItem itemType="leaf">item 1-2</TreeItem>
          <TreeItem itemType="leaf">item 1-3</TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        item 2
        <Tree>
          <TreeItem itemType="branch">
            item 2-1
            <Tree>
              <TreeItem itemType="leaf">item 2-1-1</TreeItem>
            </Tree>
          </TreeItem>

          <TreeItem itemType="branch">
            item 3
            <Tree>
              <TreeItem itemType="leaf">item 3-1</TreeItem>
              <TreeItem itemType="leaf">item 3-2</TreeItem>
              <TreeItem itemType="leaf">item 3-3</TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};

Actions.parameters = {
  docs: {
    description: {
      story: `In addition to the \`aside\` content, both tree item layouts support \`actions\` prop that can be used for tasks such as edit, rename, or triggering a menu. These action buttons are initially hidden but are shown on hover or can be controlled by the \`visible\` property, ensuring they take priority over the \`aside\` content when needed.

> ⚠️ The \`actions\` prop is \`aria-hidden\` by default. Always implement a context menu to ensure that these actions are accessible to all users. Additionally, include an \`aria-description\` or \`aria-describedby\` on tree items with actions or context menus to indicate interactions, such as "has context menu."`,
    },
  },
};
