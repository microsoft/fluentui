import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuProps, MenuPopover } from '../../index';

const EditorLayoutSubMenu = (props: { controlled?: boolean }) => {
  const { controlled } = props;
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  const controlledProps = {
    open,
    onOpenChange,
  };

  return (
    <Menu {...(controlled && controlledProps)}>
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

const AppearanceSubMenu = (props: { controlled?: boolean }) => {
  const { controlled } = props;
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  const controlledProps = {
    open,
    onOpenChange,
  };

  return (
    <Menu {...(controlled && controlledProps)}>
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

const PreferencesSubMenu = (props: { controlled?: boolean }) => {
  const { controlled } = props;
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  const controlledProps = {
    open,
    onOpenChange,
  };

  return (
    <Menu {...(controlled && controlledProps)}>
      <MenuTrigger>
        <MenuItem>Preferences</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Online Services Settings</MenuItem>
          <MenuItem>Extensions</MenuItem>
          <AppearanceSubMenu controlled={controlled} />
          <EditorLayoutSubMenu controlled={controlled} />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NestedSubmenus = (props: { controlled: boolean }) => {
  const { controlled } = props;

  return (
    <Menu>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
          <PreferencesSubMenu controlled={controlled} />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

NestedSubmenus.parameters = {
  layout: 'padded',
};

export const NestedSubmenusControlled = () => <NestedSubmenus controlled />;

NestedSubmenusControlled.parameters = {
  layout: 'padded',
};

export default {
  title: 'Components/Menu',
  component: Menu,
};
