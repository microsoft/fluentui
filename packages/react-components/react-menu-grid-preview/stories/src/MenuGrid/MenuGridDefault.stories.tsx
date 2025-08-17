import * as React from 'react';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridRow } from '@fluentui/react-menu-grid-preview';

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
              secondActionCell={<Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>}
              thirdActionCell={<Button aria-label={`Remove ${name}`}>Remove</Button>}
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
