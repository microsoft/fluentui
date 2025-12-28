import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = [
  { name: 'Olivia Carter (owner)', removable: true },
  { name: 'Liam Thompson', removable: false },
  { name: 'Sophia Martinez (you)', removable: true },
  { name: 'Noah Patel', removable: false },
  { name: 'Emma Robinson', removable: false },
];

export const Asymmetric = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(item => (
            <MenuGridItem
              key={item.name}
              firstSubAction={
                item.removable ? (
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<DeleteRegular />}
                    aria-label={`Remove ${item.name}`}
                  />
                ) : (
                  { visuallyHidden: true }
                )
              }
              icon={
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${item.name}`}
                />
              }
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
