import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { DeleteRegular, GlobePersonRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const NonCircularNavigation = (): JSXElement => {
  const showAlert = (name: string) => {
    alert(`Item ${name} activated`);
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid circular={false}>
          {items.map(name => (
            <MenuGridItem
              key={name}
              onClick={() => showAlert(name)}
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

NonCircularNavigation.parameters = {
  docs: {
    description: {
      story: [
        "If you don't want circular arrow key navigation for rows, set the `circular` prop on `MenuGrid` to `false`",
      ].join('\n'),
    },
  },
};
