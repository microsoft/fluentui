import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridCell, MenuGridRow } from '@fluentui/react-menu-grid-preview';
import { CameraRegular, DeleteRegular, GlobePersonRegular, PhoneRegular } from '@fluentui/react-icons';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

export const MoreComplexMenus = (): JSXElement => {
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Chat participants</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridRow key={name} aria-label={name}>
              <MenuGridCell>
                <Button
                  size="small"
                  appearance="transparent"
                  icon={<GlobePersonRegular />}
                  aria-label={`Profile card for ${name}`}
                />
              </MenuGridCell>
              <MenuGridCell>{name}</MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<PhoneRegular />} aria-label="Audio call" />
              </MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<CameraRegular />} aria-label="Video call" />
              </MenuGridCell>
              <MenuGridCell>
                <Button size="small" appearance="transparent" icon={<DeleteRegular />} aria-label={`Remove ${name}`} />
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
