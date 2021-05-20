import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuItemRadio,
  MenuItemCheckbox,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuProps,
} from './index';
import { boolean } from '@storybook/addon-knobs';

import { CutIcon, PasteIcon, EditIcon, AcceptIcon } from './tmp-icons.stories';

export const TextOnly = (props: Pick<MenuProps, 'openOnHover' | 'openOnContext' | 'defaultOpen'>) => (
  <Menu openOnHover={props.openOnHover} openOnContext={props.openOnContext} defaultOpen={props.defaultOpen}>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuList>
      <MenuItem>New </MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem disabled>Open File</MenuItem>
      <MenuItem>Open Folder</MenuItem>
    </MenuList>
  </Menu>
);

export const AligningWithIcons = () => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>
    <MenuList>
      <MenuItem>Cut</MenuItem>
      <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
      <MenuItem>Edit</MenuItem>
    </MenuList>
  </Menu>
);

export const AligningWithSelectableItems = () => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>
    <MenuList>
      <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
        Checkbox item
      </MenuItemCheckbox>
      <MenuItem>Menu item</MenuItem>
      <MenuItem>Menu item</MenuItem>
    </MenuList>
  </Menu>
);

export const DefaultOpen = () => <TextOnly defaultOpen />;

export const ControlledPopup = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <button>Toggle menu</button>
      </MenuTrigger>

      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const CustomTrigger = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    setOpen(data.open);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Custom Trigger</button>
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export const MenuTriggerInteractions = () => {
  const context = boolean('context', false);
  const hover = boolean('hover', false);

  return <TextOnly openOnContext={context} openOnHover={hover} />;
};

export const SelectionGroup = () => (
  <Menu>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuList>
      <MenuGroup>
        <MenuGroupHeader>Checkbox group</MenuGroupHeader>
        <MenuItemCheckbox
          secondaryContent="Ctrl+N"
          icon={<CutIcon />}
          name="edit"
          value="cut"
          checkmark={<AcceptIcon />}
        >
          Show Menu Bar
        </MenuItemCheckbox>
        <MenuItemCheckbox
          secondaryContent="Ctrl+Shift+N"
          icon={<PasteIcon />}
          name="edit"
          value="paste"
          checkmark={<AcceptIcon />}
        >
          Show Side Bar
        </MenuItemCheckbox>
        <MenuItemCheckbox
          secondaryContent="Ctrl+Shift+O"
          icon={<EditIcon />}
          name="edit"
          value="edit"
          checkmark={<AcceptIcon />}
        >
          Show Status Bar
        </MenuItemCheckbox>
        <MenuItemCheckbox disabled icon={<EditIcon />} name="disabled" value="disabled" checkmark={<AcceptIcon />}>
          Show Debug Panel
        </MenuItemCheckbox>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuGroupHeader>Radio group</MenuGroupHeader>
        <MenuItemRadio
          secondaryContent="Ctrl+N"
          icon={<CutIcon />}
          name="font"
          value="segoe"
          checkmark={<AcceptIcon />}
        >
          Segoe
        </MenuItemRadio>
        <MenuItemRadio
          secondaryContent="Ctrl+Shift+N"
          icon={<PasteIcon />}
          name="font"
          value="calibri"
          checkmark={<AcceptIcon />}
        >
          Caliri
        </MenuItemRadio>
        <MenuItemRadio
          secondaryContent="Ctrl+Shift+N"
          icon={<EditIcon />}
          name="font"
          value="arial"
          checkmark={<AcceptIcon />}
        >
          Arial
        </MenuItemRadio>
      </MenuGroup>
    </MenuList>
  </Menu>
);

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

      <MenuList>
        <MenuItem>Split Up</MenuItem>
        <MenuItem>Split Down</MenuItem>
        <MenuItem>Single</MenuItem>
      </MenuList>
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

      <MenuList>
        <MenuItem>Centered Layout</MenuItem>
        <MenuItem>Zen</MenuItem>
        <MenuItem disabled>Zoom In</MenuItem>
        <MenuItem>Zoom Out</MenuItem>
      </MenuList>
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

      <MenuList>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Online Services Settings</MenuItem>
        <MenuItem>Extensions</MenuItem>
        <AppearanceSubMenu controlled={controlled} />
        <EditorLayoutSubMenu controlled={controlled} />
      </MenuList>
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

      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
        <PreferencesSubMenu controlled={controlled} />
      </MenuList>
    </Menu>
  );
};

export const NestedSubmenusControlled = () => <NestedSubmenus controlled />;

export default {
  // use the Components prefix to have the same URL as react-examples
  title: 'Components/Menu',
  component: Menu,
};
