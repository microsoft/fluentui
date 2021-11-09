import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MenuList, MenuItem, Menu, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { makeStyles } from '@fluentui/react-make-styles';

export const useMenuListContainerStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
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
          <MenuTrigger>
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
