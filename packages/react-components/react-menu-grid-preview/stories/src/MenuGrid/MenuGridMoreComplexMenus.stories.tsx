import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow } from '@fluentui/react-menu-grid-preview';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const MoreComplexMenus = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map((name, index) => (
            <MenuGridRow key={index} aria-label={name}>
              <MenuGridCell>{name}</MenuGridCell>
              <MenuGridCell>
                <Button aria-label={`Profile card for ${name}`}>Avatar icon</Button>
              </MenuGridCell>
              <MenuGridCell>
                <Button>Audio call</Button>
              </MenuGridCell>
              <MenuGridCell>
                <Button>Video call</Button>
              </MenuGridCell>
              <MenuGridCell>
                <Button aria-label={`Remove ${name}`}>Remove</Button>
              </MenuGridCell>
            </MenuGridRow>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};

MoreComplexMenus.parameters = {
  docs: {
    description: {
      story: [
        'If you need to create a more complex menu grid layout, e.g., with more than two sub-actions, you can use the `MenuGridRow` and `MenuGridCell` directly to achieve the desired structure, though the use of `MenuGridItem` is highly recommended whenever possible.',
      ].join('\n'),
    },
  },
};
