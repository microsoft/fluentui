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
import { Cut20Regular, Edit20Regular, ClipboardPaste20Regular } from '@fluentui/react-icons';

const rootTriggerId = 'rootTrigger';

storiesOf('Menu - basic', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click(`#${rootTriggerId}`)
        .snapshot('opened')
        .hover('[role="menuitem"]')
        .snapshot('hover menuitem')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('default', () => (
    <Menu>
      <MenuTrigger>
        <button id={rootTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem icon={<Cut20Regular />}>Cut </MenuItem>
          <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
          <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));

storiesOf('Menu - secondary content', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().click(`#${rootTriggerId}`).snapshot('opened').end()}>
      {story()}
    </Screener>
  ))
  .addStory('default', () => (
    <Menu>
      <MenuTrigger>
        <button id={rootTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem icon={<Cut20Regular />} secondaryContent="Ctrl+X">
            Cut{' '}
          </MenuItem>
          <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
          <MenuItem icon={<ClipboardPaste20Regular />} secondaryContent="Ctrl+P">
            Paste
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));

storiesOf('Menu - groups', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().click(`#${rootTriggerId}`).snapshot('opened').end()}>
      {story()}
    </Screener>
  ))
  .addStory('default', () => (
    <Menu>
      <MenuTrigger>
        <button id={rootTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>Section header</MenuGroupHeader>
            <MenuItem icon={<Cut20Regular />}>Cut</MenuItem>
            <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
            <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuGroupHeader>Section header</MenuGroupHeader>
            <MenuItem icon={<Cut20Regular />}>Cut</MenuItem>
            <MenuItem icon={<ClipboardPaste20Regular />}>Paste</MenuItem>
            <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));

storiesOf('Menu - selection', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click(`#${rootTriggerId}`)
        .snapshot('opened')
        .click('[role="menuitemcheckbox"]')
        .snapshot('selected')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('default', () => (
    <Menu>
      <MenuTrigger>
        <button id={rootTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemCheckbox icon={<Cut20Regular />} name="edit" value="cut">
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<ClipboardPaste20Regular />} name="edit" value="paste">
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<Edit20Regular />} name="edit" value="edit">
            Edit
          </MenuItemCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));

storiesOf('Menu - selection groups', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click(`#${rootTriggerId}`)
        .snapshot('opened')
        .click('[role="menuitemcheckbox"]')
        .snapshot('selected')
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('default', () => (
    <Menu>
      <MenuTrigger>
        <button id={rootTriggerId}>Toggle menu</button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>Checkbox group</MenuGroupHeader>
            <MenuItemCheckbox icon={<Cut20Regular />} name="edit" value="cut">
              Cut
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<ClipboardPaste20Regular />} name="edit" value="paste">
              Paste
            </MenuItemCheckbox>
            <MenuItemCheckbox icon={<Edit20Regular />} name="edit" value="edit">
              Edit
            </MenuItemCheckbox>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuGroupHeader>Radio group</MenuGroupHeader>
            <MenuItemRadio icon={<Cut20Regular />} name="font" value="segoe">
              Segoe
            </MenuItemRadio>
            <MenuItemRadio icon={<ClipboardPaste20Regular />} name="font" value="calibri">
              Caliri
            </MenuItemRadio>
            <MenuItemRadio icon={<Edit20Regular />} name="font" value="arial">
              Arial
            </MenuItemRadio>
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  ));
