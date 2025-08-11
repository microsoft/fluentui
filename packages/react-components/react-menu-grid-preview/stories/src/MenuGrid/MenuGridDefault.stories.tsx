import * as React from 'react';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridRow } from '@fluentui/react-menu-grid-preview';
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
            <MenuGridRow
              key={index}
              iconCell={                <Button size="small" appearance="transparent" icon={<GlobePersonRegular />} aria-label={`Profile card for ${name}`}></Button>}
              thirdActionCell={<Button size="small" appearance='transparent' icon={<DeleteRegular />} aria-label={`Remove ${name}`}></Button>}
              aria-label={name}
            >
              {name}
            </MenuGridRow>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};
