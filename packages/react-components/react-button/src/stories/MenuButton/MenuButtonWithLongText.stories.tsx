import * as React from 'react';
import { makeStyles, Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton>Short text</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu>
        <MenuTrigger>
          <MenuButton className={styles.longText}>
            Long text wraps after it hits the max width of the component
          </MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

WithLongText.parameters = {
  docs: {
    description: {
      story: 'Text wraps after it hits the max width of the component.',
    },
  },
};
