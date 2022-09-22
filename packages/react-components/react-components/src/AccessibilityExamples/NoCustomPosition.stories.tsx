import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
  Divider,
} from '@fluentui/react-components';

import { Scenario } from './utils';

export const AvoidPositionExample = () => {
  return (
    <Scenario pageTitle="Avoid position in accessibility name">
      <h1>Avoid position in accessibility name</h1>

      <h2>Bad example</h2>
      <Menu>
        <MenuTrigger>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem role="listitem" aria-label="Account settings..., first item of four">
              Account settings...
            </MenuItem>
            <MenuItem role="listitem" aria-label="Change status message..., second item of four">
              Change status message...
            </MenuItem>
            <MenuItem role="listitem" aria-label="Help, third item of four">
              Help
            </MenuItem>
            <MenuItem role="listitem" aria-label="Sign out, fourth item of four">
              Sign out
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <h3>Screen reader narration after menu button activation</h3>
      <Text block>
        <Text weight="semibold">JAWS:</Text> "Profile menu
        <br />
        Account settings..., first item of four. To move through items press up or down arrow.
        <br />
        Change status message..., second item of four
        <br />
        Help, third item of four
        <br />
        Sign out, fourth item of four"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>
          A custom "X of Y" position information is hard-coded manually as the part of each menu item's "aria-label"
          attribute value.
        </li>
      </ul>
      <Divider appearance="strong" />
      <h2>Good example</h2>
      <Menu>
        <MenuTrigger>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Account settings...</MenuItem>
            <MenuItem>Change status message...</MenuItem>
            <MenuItem>Help</MenuItem>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <h3>Screen reader narration after menu button activation</h3>
      <Text block>
        <Text weight="semibold">JAWS:</Text> "Profile menu
        <br />
        Account settings..., 1 of 4. To move through items press up or down arrow.
        <br />
        Change status message..., 2 of 4<br />
        Help, 3 of 4<br />
        Sign out, 4 of 4"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>
          The "X of Y" position information is added automatically by the screen reader for each menu item because the
          correct ARIA role is used both for all individual menu item elements (role="menuitem") and the parent menu
          element (role="menu").
        </li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Even though the screen reader narration might seem similar, don't hard-code a custom "X of Y" position
          information manually as the part of the accessible name of each individual item, but instead use proper ARIA
          roles and let the screen reader add the "X of Y" information for you.
        </li>
        <li>
          The JAWS screen reader currently supports the "X of Y" information for the following roles: "listbox", "menu",
          "tablist" and "tree". See the <a href="https://www.w3.org/TR/wai-aria-1.2/">ARIA specification</a> to learn
          which required owned elements (such as "option", "menuitem", "tab" or "treeitem") should be used with these
          roles.
        </li>
      </ul>
    </Scenario>
  );
};
