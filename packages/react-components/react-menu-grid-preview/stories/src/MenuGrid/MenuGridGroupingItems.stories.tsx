import * as React from 'react';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import {
  MenuGrid,
  MenuGridRow,
  MenuGridRowGroup,
  MenuGridRowGroupHeader,
} from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

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
              <MenuGridRow
                key={index}
                secondActionCell={<Button size="small" appearance="transparent" icon={<GlobePersonRegular />} aria-label={`Profile card for ${name}`}></Button>}
                thirdActionCell={<Button size="small" appearance='transparent' icon={<DeleteRegular />} aria-label={`Remove ${name}`}></Button>}
                aria-label={name}
              >
                {name}
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
