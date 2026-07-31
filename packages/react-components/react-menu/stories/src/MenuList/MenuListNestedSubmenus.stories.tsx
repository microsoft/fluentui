import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { MenuList, MenuItem, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';

import styles from './MenuListNestedSubmenus.module.css';

export const MenuListWithNestedSubmenus = (): JSXElement => {
  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuItem>Preferences</MenuItem>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>Cut</MenuItem>
              <MenuItem>Paste</MenuItem>
              <MenuItem>Edit</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </div>
  );
};

MenuListWithNestedSubmenus.parameters = {
  docs: {
    description: {
      story: [
        'A permanent `MenuList` can also nest `Menu` components. This can be useful when embedding `MenuList` inside',
        'a custom temporary surface such as a popover dialog.',
      ].join('\n'),
    },
  },
};
