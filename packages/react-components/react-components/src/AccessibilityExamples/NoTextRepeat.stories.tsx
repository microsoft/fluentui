import * as React from 'react';

import {
  Text,
  Divider,
  Avatar,
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from '@fluentui/react-components';

import { PeopleRegular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const NoRepeatText = () => {
  return (
    <Scenario pageTitle="Avoid repeating text for item within one component ">
      <h1>Avoid repeating text for item within one component</h1>
      <h2>Bad example</h2>
      <Menu>
        <MenuTrigger>
          <Button aria-label="Participants" icon={<PeopleRegular />}></Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem aria-label="Meeting participant Robert Tolbert" icon={<Avatar />}>
              Robert Tolbert
            </MenuItem>
            <MenuItem aria-label="Meeting participant Celeste Burton" icon={<Avatar />}>
              Celeste Burton
            </MenuItem>
            <MenuItem aria-label="Meeting participant Cecil Folk" icon={<Avatar />}>
              Cecil Folk
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text> "Participants menu <br /> Meeting participant Robert Tolbert 1 of 3 To
        move through items press up or down arrow. <br /> Meeting participant Celeste Burton 2 of 3 <br /> Meeting
        participant Cecil Folk 3 of 3"
      </Text>

      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Meeting participant [user name]" was applied on each menuitem</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Good example</h2>
      <Menu>
        <MenuTrigger>
          <Button aria-label="Participants" icon={<PeopleRegular />}></Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList aria-label="Meeting participants" aria-labelledby={undefined}>
            <MenuItem aria-label="Robert Tolbert" icon={<Avatar />}>
              Robert Tolbert
            </MenuItem>
            <MenuItem aria-label="Celeste Burton" icon={<Avatar />}>
              Celeste Burton
            </MenuItem>
            <MenuItem aria-label="Cecil Folk" icon={<Avatar />}>
              Cecil Folk
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>
        "Meeting participants menu <br /> Robert Tolbert 1 of 3 To move through items press up or down arrow. <br />
        Celeste Burton 2 of 3 <br /> Cecil Folk 3 of 3"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>no aria-label is needed for each menuitem</li>
        <li>aria-label="Meeting participants" was applied on menu component</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding the repeating text on each item in the component prolongs the name narration by the screen reader. User
          needs to wait for content to be narrated.
        </li>
        <li> Recommendation would be to label the component (menu in our example) with appropriate name.</li>
        <li> This general principle is valid as well for others components like Tree, List, Listbox, Toolbar, etc.</li>
      </ul>
    </Scenario>
  );
};
