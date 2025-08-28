import * as React from 'react';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = [
  { name: 'Olivia Carter (owner)', cannotRemove: true },
  { name: 'Liam Thompson', cannotRemove: false },
  { name: 'Sophia Martinez (you)', cannotRemove: true },
  { name: 'Noah Patel', cannotRemove: false },
  { name: 'Emma Robinson', cannotRemove: false },
];

export const Asymmetric = () => {
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
                  <Button
                    size="small"
                    appearance="transparent"
                    icon={<DeleteRegular />}
                    aria-label={`Remove ${item.name}`}
                  />
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
