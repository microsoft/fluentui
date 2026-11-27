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
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

const ItemWithControlledMenu = ({ children }: { children: string }): JSXElement => {
  const [open, setOpen] = React.useState(false);
  const focusTargetAttribute = useRestoreFocusTarget();
  const treeItemRef = React.useRef<HTMLDivElement>(null);

  return (
    <TreeItem ref={treeItemRef} itemType="leaf" aria-description="has actions" {...focusTargetAttribute}>
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
                  onPointerDownCapture={() => {
                    if (!open) {
                      treeItemRef.current?.focus({ preventScroll: true });
                    }
                  }}
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
Hidden actions are unmounted without notifying the menu's \`onOpenChange\`. Controlled state held outside the slot survives, so the menu can reopen when actions return.
Keep separate state for each item: update it from \`onOpenChange\` and reset \`open\` when \`actions.onVisibilityChange\` reports \`data.visible === false\`.

Mark the persistent \`TreeItem\` with \`useRestoreFocusTarget\` and focus it before pointer-opening a closed menu to establish the restoration target.
Skip this handoff when the menu is open so clicking its trigger can dismiss it.

Try opening an item's menu, hovering the other item, then returning. The actions should reappear with the menu closed.

As in the [Actions example](?path=/story/components-tree--actions), also provide a context menu with the same commands for standard tree interaction.
`,
    },
  },
};
