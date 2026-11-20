import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

const ItemWithControlledMenu = ({ children }: { children: string }): JSXElement => {
  const [open, setOpen] = React.useState(false);

  return (
    <TreeItem itemType="leaf" aria-description="has actions">
      <TreeItemLayout
        actions={{
          onVisibilityChange: (_, data) => {
            if (!data.visible) {
              setOpen(false);
            }
          },
          children: (
            <Menu open={open} onOpenChange={(_, data) => setOpen(data.open)}>
              <MenuTrigger disableButtonEnhancement>
                <Button
                  aria-label={`More options for ${children}`}
                  appearance="subtle"
                  icon={<MoreHorizontal20Regular />}
                />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Open</MenuItem>
                  <MenuItem>Rename</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          ),
        }}
      >
        {children}
      </TreeItemLayout>
    </TreeItem>
  );
};

export const ActionsControlled = (): JSXElement => (
  <Tree aria-label="Controlled action menus">
    <ItemWithControlledMenu>item 1</ItemWithControlledMenu>
    <ItemWithControlledMenu>item 2</ItemWithControlledMenu>
  </Tree>
);

ActionsControlled.parameters = {
  docs: {
    description: {
      story: `
When a \`Menu\` in the \`actions\` slot is controlled, update its \`open\` state from both the menu's \`onOpenChange\` and the slot's \`onVisibilityChange\`.
Reset \`open\` to \`false\` when \`data.visible\` is \`false\`; leave it unchanged when the actions become visible.

Hidden actions are unmounted. Unmounting a menu does not reset controlled state stored in the tree item or notify \`onOpenChange\` that the menu has closed.
Without this reset, a menu whose state is still \`open\` remounts open when the actions become visible again.
Keep separate menu state for each tree item, outside the actions subtree.

Open an item's menu, move to the other item so the first item's actions disappear, then return.
The first item's actions should reappear with its menu closed, until you open it again.
The same reset applies when focus leaves the actions.

This example focuses on controlled state. As with the [Actions example](?path=/story/components-tree--actions),
provide a context menu with the same commands so actions are also available through the standard tree interaction pattern.
`,
    },
  },
};
