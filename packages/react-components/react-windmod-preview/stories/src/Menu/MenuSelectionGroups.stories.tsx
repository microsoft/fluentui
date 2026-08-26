import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

export const SelectionGroups = (): React.ReactNode => {
  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    panels: ['sidebar'],
    theme: ['light'],
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
            <Button>View options</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuGroup>
                <MenuGroupHeader>Panels</MenuGroupHeader>
                <MenuItemCheckbox name="panels" value="sidebar">
                  Sidebar
                </MenuItemCheckbox>
                <MenuItemCheckbox name="panels" value="inspector">
                  Inspector
                </MenuItemCheckbox>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuGroupHeader>Theme</MenuGroupHeader>
                <MenuItemRadio name="theme" value="light">
                  Light
                </MenuItemRadio>
                <MenuItemRadio name="theme" value="dark">
                  Dark
                </MenuItemRadio>
              </MenuGroup>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </FluentProvider>
  );
};
