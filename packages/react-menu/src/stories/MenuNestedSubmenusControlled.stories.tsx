import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

// FIXME need to redeclare types since type import is under a @ts-ignore
type MenuOpenEvents =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

const EditorLayoutSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <MenuItem>Editor Layout</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Split Up</MenuItem>
          <MenuItem>Split Down</MenuItem>
          <MenuItem>Single</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const AppearanceSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <MenuItem>Appearance</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Centered Layout</MenuItem>
          <MenuItem>Zen</MenuItem>
          <MenuItem disabled>Zoom In</MenuItem>
          <MenuItem>Zoom Out</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const PreferencesSubMenu = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange = (e: MenuOpenEvents, data: { open: boolean }) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <MenuItem>Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu />
          <EditorLayoutSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NestedSubmenusControlled = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <PreferencesSubMenu />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

NestedSubmenusControlled.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: [
        'Menus can be nested within each other to render application submenus.',
        'Submenus are a complex control for any app, make sure you need them.',
        '',
        '- Try and limit nesting to 2 levels.',
        '- Creating submenus as separate components will result in more maintainable code.',
      ].join('\n'),
    },
  },
};
