import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { Menu, MenuItemSwitch, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-windmod-preview/menu';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import styles from '../compare.module.css';

export const ItemSwitches = (): React.ReactNode => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    surfaces: ['grid'],
  });

  return (
    <FluentProvider>
      <div className={styles.spacer}>
        <Menu
          checkedValues={checkedValues}
          onCheckedValueChange={(_event, data) =>
            setCheckedValues(current => ({ ...current, [data.name]: data.checkedItems }))
          }
        >
          <MenuTrigger>
            <Button>Canvas</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemSwitch name="surfaces" value="grid">
                Grid
              </MenuItemSwitch>
              <MenuItemSwitch name="surfaces" value="rulers" subText="Shown along both edges">
                Rulers
              </MenuItemSwitch>
              <MenuItemSwitch name="surfaces" value="guides" disabled>
                Guides
              </MenuItemSwitch>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </FluentProvider>
  );
};
