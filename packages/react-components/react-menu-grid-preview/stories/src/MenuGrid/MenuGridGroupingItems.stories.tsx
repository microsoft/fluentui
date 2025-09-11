import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridGroup, MenuGridGroupHeader, MenuGridItem } from '@fluentui/react-menu-grid-preview';

const items = {
  people: ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'],
  agentsAndBots: ['Facilitator', 'Copilot'],
};

export const GroupingItems = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          <MenuGridGroup>
            <MenuGridGroupHeader>People</MenuGridGroupHeader>
            {items.people.map((name, index) => (
              <MenuGridItem
                key={index}
                firstSubAction={<Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>}
                secondSubAction={<Button aria-label={`Remove ${name}`}>Remove</Button>}
                aria-label={name}
              >
                {name}
              </MenuGridItem>
            ))}
          </MenuGridGroup>
          <MenuGridGroup>
            <MenuGridGroupHeader>Agents and bots</MenuGridGroupHeader>
            {items.agentsAndBots.map((name, index) => (
              <MenuGridItem
                key={index}
                firstSubAction={<Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>}
                secondSubAction={<Button aria-label={`Remove ${name}`}>Remove</Button>}
                aria-label={name}
              >
                {name}
              </MenuGridItem>
            ))}
          </MenuGridGroup>
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};

GroupingItems.parameters = {
  docs: {
    description: {
      story: [
        'A menu grid can be divided into separate groups, using the `MenuGridGroup` and `MenuGridGroupHeader`',
        'components. This ensures the correct accessible markup is rendered for screen reader users.',
      ].join('\n'),
    },
  },
};
