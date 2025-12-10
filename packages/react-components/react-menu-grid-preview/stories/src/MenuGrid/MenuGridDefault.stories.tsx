import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const Default = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridItem
              key={name}
              aria-label={name}
              icon={
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${name}`}
                />
              }
              firstSubAction={
                <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
              }
            >
              {name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
