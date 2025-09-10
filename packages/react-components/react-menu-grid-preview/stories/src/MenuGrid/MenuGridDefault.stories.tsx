import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const Default = (): JSXElement => {
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
              firstSubAction={<Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>}
              secondSubAction={<Button aria-label={`Remove ${name}`}>Remove</Button>}
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
