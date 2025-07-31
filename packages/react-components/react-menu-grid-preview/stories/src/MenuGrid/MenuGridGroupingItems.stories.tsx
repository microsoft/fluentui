import * as React from 'react';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import {
  MenuGrid,
  MenuGridCell,
  MenuGridRow,
  MenuGridRowGroup,
  MenuGridRowGroupHeader,
} from '@fluentui/react-menu-grid-preview';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
};

export const GroupingItems = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          <MenuGridRowGroup>
            <MenuGridRowGroupHeader>People</MenuGridRowGroupHeader>
            {items.people.map((name, index) => (
              <MenuGridRow key={index} aria-label={name}>
                <MenuGridCell>{name}</MenuGridCell>
                <MenuGridCell>
                  <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
                </MenuGridCell>
                <MenuGridCell>
                  <Button>Remove {name}</Button>
                </MenuGridCell>
              </MenuGridRow>
            ))}
          </MenuGridRowGroup>
          <MenuGridRowGroup>
            <MenuGridRowGroupHeader>Agents and bots</MenuGridRowGroupHeader>
            {items.agentsAndBots.map((name, index) => (
              <MenuGridRow key={index} aria-label={name}>
                <MenuGridCell>{name}</MenuGridCell>
                <MenuGridCell>
                  <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
                </MenuGridCell>
                <MenuGridCell>
                  <Button>Remove {name}</Button>
                </MenuGridCell>
              </MenuGridRow>
            ))}
          </MenuGridRowGroup>
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};

GroupingItems.parameters = {
  docs: {
    description: {
      story: [
        'A menu grid can be divided in to separate groups, using the `MenuGridRowGroup` and `MenuGridRowGroupHeader`',
        'components. This ensures the correct accessible markup is rendered for screen reader users.',
      ].join('\n'),
    },
  },
};
