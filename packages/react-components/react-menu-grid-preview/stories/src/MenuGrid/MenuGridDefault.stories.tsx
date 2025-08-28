import * as React from 'react';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const Default = () => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map((name, index) => (
            <MenuGridItem
              key={index}
              icon={
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${name}`}
                />
              }
              secondSubAction={
                <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
              }
              aria-label={name}
            >
              {name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
