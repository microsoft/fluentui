import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';

const items = [
  { name: 'Olivia Carter (owner)', cannotRemove: true },
  { name: 'Liam Thompson', cannotRemove: false },
  { name: 'Sophia Martinez (you)', cannotRemove: true },
  { name: 'Noah Patel', cannotRemove: false },
  { name: 'Emma Robinson', cannotRemove: false },
];

export const Asymmetric = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map((item, index) => (
            <MenuGridItem
              key={index}
              firstSubAction={
                item.cannotRemove ? (
                  { visuallyHidden: true }
                ) : (
                  <Button aria-label={`Remove ${item.name}`}>Remove</Button>
                )
              }
              secondSubAction={<Button aria-label={`Profile card for ${item.name}`}>Avatar icon</Button>}
              aria-label={item.name}
            >
              {item.name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};

Asymmetric.parameters = {
  docs: {
    description: {
      story: [
        'If `MenuGridItem` sub-actions are asymmetric, use the `visuallyHidden` property of the `firstSubAction` or `secondSubAction` slot to create an empty and visually hidden cell so the grid is structured correctly.',
      ].join('\n'),
    },
  },
};
