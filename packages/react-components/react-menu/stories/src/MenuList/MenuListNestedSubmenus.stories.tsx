import * as React from 'react';
import { makeStyles, tokens, MenuList, MenuItem, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-components';

const useMenuListContainerStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${tokens.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
});

export const MenuListWithNestedSubmenus = () => {
  const styles = useMenuListContainerStyles();
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
