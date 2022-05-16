import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
} from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

storiesOf('Menu Converged - basic', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutRegular />}>Cut</MenuItem>
            <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - secondary content', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem icon={<CutRegular />} secondaryContent="Ctrl+X">
              Cut
            </MenuItem>
            <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            <MenuItem icon={<ClipboardPasteRegular />} secondaryContent="Ctrl+P">
              Paste
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );

storiesOf('Menu Converged - groups', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'default',
    () => (
      <Menu open>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Section header</MenuGroupHeader>
              <MenuItem icon={<CutRegular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
              <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Section header</MenuGroupHeader>
              <MenuItem icon={<CutRegular />}>Cut</MenuItem>
              <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
              <MenuItem icon={<EditRegular />}>Edit</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );

storiesOf('Menu Converged - selection', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'checkbox',
    () => (
      <Menu open checkedValues={{ edit: ['cut'] }}>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
              Cut
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
              Paste
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
              Edit
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  );

storiesOf('Menu Converged - selection groups', module)
  .addDecorator(story => <Screener>{story()}</Screener>)
  .addStory(
    'default',
    () => (
      <Menu open checkedValues={{ edit: ['cut'] }}>
        <MenuTrigger>
          <button>Toggle menu</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Checkbox group</MenuGroupHeader>
              <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
                Cut
              </MenuItemCheckbox>
              <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
                Paste
              </MenuItemCheckbox>
              <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
                Edit
              </MenuItemCheckbox>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Radio group</MenuGroupHeader>
              <MenuItemRadio icon={<CutRegular />} name="font" value="segoe">
                Segoe
              </MenuItemRadio>
              <MenuItemRadio icon={<ClipboardPasteRegular />} name="font" value="calibri">
                Caliri
              </MenuItemRadio>
              <MenuItemRadio icon={<EditRegular />} name="font" value="arial">
                Arial
              </MenuItemRadio>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    ),
    { includeRtl: true },
  );
