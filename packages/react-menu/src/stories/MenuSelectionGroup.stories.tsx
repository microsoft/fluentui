import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItemRadio,
  MenuItemCheckbox,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuPopover,
} from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
} from '@fluentui/react-icons';

export const SelectionGroup = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox secondaryContent="Ctrl+N" icon={<CutIcon />} name="edit" value="cut">
            Show Menu Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox secondaryContent="Ctrl+Shift+N" icon={<PasteIcon />} name="edit" value="paste">
            Show Side Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox secondaryContent="Ctrl+Shift+O" icon={<EditIcon />} name="edit" value="edit">
            Show Status Bar
          </MenuItemCheckbox>
          <MenuItemCheckbox disabled icon={<EditIcon />} name="disabled" value="disabled">
            Show Debug Panel
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio secondaryContent="Ctrl+N" icon={<CutIcon />} name="font" value="segoe">
            Segoe
          </MenuItemRadio>
          <MenuItemRadio secondaryContent="Ctrl+Shift+N" icon={<PasteIcon />} name="font" value="calibri">
            Caliri
          </MenuItemRadio>
          <MenuItemRadio secondaryContent="Ctrl+Shift+N" icon={<EditIcon />} name="font" value="arial">
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);

SelectionGroup.parameters = {
  docs: {
    description: {
      story: [
        'Both menu item checkboxes and radio items can be used in the same menu surface.',
        'Different selection areas should be grouped to provide clear expectations for users.',
      ].join('\n'),
    },
  },
};
