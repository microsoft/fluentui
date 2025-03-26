import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroupHeader,
  MenuGroup,
  MenuDivider,
  MenuSplitGroup,
  MenuItemSwitch,
  MenuItemCheckbox,
} from '@fluentui/react-menu';
import { EditFilled, EditRegular, bundleIcon } from '@fluentui/react-icons';
import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Multiline items',

  decorators: [
    story =>
      withStoryWrightSteps({ story, steps: new Steps().hover('[role="menuitem"]').snapshot('hover menuitem').end() }),
  ],
} satisfies Meta<typeof Menu>;

const EditIcon = bundleIcon(EditFilled, EditRegular);

const TextOnly = () => (
  <MenuGroup>
    <MenuGroupHeader>Text only</MenuGroupHeader>
    <MenuItem>Copy</MenuItem>
    <MenuItem subText="Copy text">Copy</MenuItem>
  </MenuGroup>
);

const TextWithIcon = () => (
  <MenuGroup>
    <MenuGroupHeader>Text with Icon</MenuGroupHeader>
    <MenuItem icon={<EditIcon />}>Copy</MenuItem>
    <MenuItem subText="Copy text" icon={<EditIcon />}>
      Copy
    </MenuItem>
  </MenuGroup>
);

const TextOnlySubmenu = () => (
  <MenuGroup>
    <MenuGroupHeader>Text only submenu</MenuGroupHeader>
    <Menu>
      <MenuTrigger>
        <MenuItem>Open</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Open in browser</MenuItem>
          <MenuItem>Open in desktop</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <Menu>
      <MenuTrigger>
        <MenuItem subText="Open file">Open</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Open in browser</MenuItem>
          <MenuItem>Open in desktop</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </MenuGroup>
);

const IconAndSubmenu = () => (
  <MenuGroup>
    <MenuGroupHeader>Icon and submenu</MenuGroupHeader>
    <Menu>
      <MenuTrigger>
        <MenuItem icon={<EditIcon />}>Open</MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Open in browser</MenuItem>
          <MenuItem>Open in desktop</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <Menu>
      <MenuTrigger>
        <MenuItem subText="Open file" icon={<EditIcon />}>
          Open
        </MenuItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Open in browser</MenuItem>
          <MenuItem>Open in desktop</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </MenuGroup>
);

const IconAndSecondary = () => (
  <MenuGroup>
    <MenuGroupHeader>Icon and secondary</MenuGroupHeader>
    <MenuItem icon={<EditIcon />} secondaryContent="Ctrl+C">
      Copy
    </MenuItem>
    <MenuItem icon={<EditIcon />} subText="Copy text" secondaryContent="Ctrl+C">
      Copy
    </MenuItem>
  </MenuGroup>
);

const SplitWithEverything = () => (
  <MenuGroup>
    <MenuGroupHeader>Split with everything</MenuGroupHeader>
    <Menu>
      <MenuSplitGroup>
        <MenuItem icon={<EditIcon />} secondaryContent="Ctrl+N">
          New folder
        </MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <Menu>
      <MenuSplitGroup>
        <MenuItem icon={<EditIcon />} subText="Creates a new folder" secondaryContent="Ctrl+N">
          New folder
        </MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </MenuGroup>
);

const SplitWithSecondary = () => (
  <MenuGroup>
    <MenuGroupHeader>Split with secondary</MenuGroupHeader>
    <Menu>
      <MenuSplitGroup>
        <MenuItem secondaryContent="Ctrl+N">New folder</MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <Menu>
      <MenuSplitGroup>
        <MenuItem subText="Creates a new folder" secondaryContent="Ctrl+N">
          New folder
        </MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </MenuGroup>
);

const SplitTextOnly = () => (
  <MenuGroup>
    <MenuGroupHeader>Split text only</MenuGroupHeader>
    <Menu>
      <MenuSplitGroup>
        <MenuItem>New folder</MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    <Menu>
      <MenuSplitGroup>
        <MenuItem subText="Creates a new folder">New folder</MenuItem>
        <MenuTrigger>
          <MenuItem />
        </MenuTrigger>
      </MenuSplitGroup>
      <MenuPopover>
        <MenuList>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
          <MenuItem>New folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </MenuGroup>
);

const SelectableTextOnly = () => (
  <MenuGroup>
    <MenuGroupHeader>Selectable text only</MenuGroupHeader>
    <MenuItemCheckbox value="foo" name="foo">
      Select this thing
    </MenuItemCheckbox>
    <MenuItemCheckbox value="foo" name="foo" subText="Selection">
      Select this thing
    </MenuItemCheckbox>
  </MenuGroup>
);

const SelectableWithIcon = () => (
  <MenuGroup>
    <MenuGroupHeader>Selectable with Icon</MenuGroupHeader>
    <MenuItemCheckbox value="foo" name="bar" icon={<EditIcon />}>
      Select this thing
    </MenuItemCheckbox>
    <MenuItemCheckbox value="foo" name="bar" subText="Selection" icon={<EditIcon />}>
      Select this thing
    </MenuItemCheckbox>
  </MenuGroup>
);

const SelectableWithIconAndSecondary = () => (
  <MenuGroup>
    <MenuGroupHeader>Selectable with icon and secondary</MenuGroupHeader>
    <MenuItemCheckbox icon={<EditIcon />} value="foo" name="bac" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemCheckbox>
    <MenuItemCheckbox icon={<EditIcon />} value="foo" name="bac" subText="Selection" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemCheckbox>
  </MenuGroup>
);

const SelectableWithSecondary = () => (
  <MenuGroup>
    <MenuGroupHeader>Selectable with secondary</MenuGroupHeader>
    <MenuItemCheckbox value="foo" name="baz" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemCheckbox>
    <MenuItemCheckbox value="foo" name="baz" subText="Selection" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemCheckbox>
  </MenuGroup>
);

const SwitchTextOnly = () => (
  <MenuGroup>
    <MenuGroupHeader>SwitchTextOnly</MenuGroupHeader>
    <MenuItemSwitch value="foo" name="switch">
      Select this thing
    </MenuItemSwitch>
    <MenuItemSwitch value="foo" name="switch" subText="Selection">
      Select this thing
    </MenuItemSwitch>
  </MenuGroup>
);

const SwitchWithIcon = () => (
  <MenuGroup>
    <MenuGroupHeader>SwitchTextOnly</MenuGroupHeader>
    <MenuItemSwitch icon={<EditIcon />} value="foo" name="switch1">
      Select this thing
    </MenuItemSwitch>
    <MenuItemSwitch icon={<EditIcon />} value="foo" name="switch1" subText="Selection">
      Select this thing
    </MenuItemSwitch>
  </MenuGroup>
);

const SwitchWithIconAndSecondary = () => (
  <MenuGroup>
    <MenuGroupHeader>SwitchTextOnly</MenuGroupHeader>
    <MenuItemSwitch icon={<EditIcon />} value="foo" name="switch2" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemSwitch>
    <MenuItemSwitch icon={<EditIcon />} value="foo" name="switch2" subText="Selection" secondaryContent="Ctrl+Spacebar">
      Select this thing
    </MenuItemSwitch>
  </MenuGroup>
);

export const Default = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Menu open>
        <MenuTrigger>
          <button>Multiline items</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList style={{ minWidth: 290 }}>
            <TextWithIcon />
            <MenuDivider />
            <TextOnlySubmenu />
            <MenuDivider />
            <IconAndSecondary />
            <MenuDivider />
            <IconAndSubmenu />
            <MenuDivider />
            <SplitWithEverything />
            <MenuDivider />
            <SplitWithSecondary />
            <MenuDivider />
            <SplitTextOnly />
          </MenuList>
        </MenuPopover>
      </Menu>
      <Menu open>
        <MenuTrigger>
          <button>Multiline items</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList style={{ minWidth: 290 }}>
            <TextOnly />
            <MenuDivider />
            <SelectableTextOnly />
            <MenuDivider />
            <SelectableWithIcon />
            <MenuDivider />
            <SelectableWithSecondary />
            <MenuDivider />
            <SelectableWithIconAndSecondary />
            <MenuDivider />
            <SwitchTextOnly />
            <MenuDivider />
            <SwitchWithIcon />
            <MenuDivider />
            <SwitchWithIconAndSecondary />
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
