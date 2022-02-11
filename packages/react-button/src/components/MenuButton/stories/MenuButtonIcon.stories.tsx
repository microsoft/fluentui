import * as React from 'react';

import { CalendarMonthRegular, FilterRegular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { Tooltip } from '@fluentui/react-tooltip';
import { makeStyles } from '@griffel/react';
import { MenuButton } from '../../../MenuButton';

const useStyles = makeStyles({
  longText: {
    maxWidth: '380px',
  },
});

export const Icon = () => {
  const styles = useStyles();

  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton icon={<CalendarMonthRegular />}>With calendar icon</MenuButton>
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
          <MenuButton icon={<CalendarMonthRegular />} menuIcon={<FilterRegular />} className={styles.longText}>
            With calendar icon and custom filter menu icon
          </MenuButton>
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
          <Tooltip content="With calendar icon and no contents" relationship="label">
            <MenuButton icon={<CalendarMonthRegular />} />
          </Tooltip>
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
Icon.parameters = {
  docs: {
    description: {
      story:
        'MenuButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.',
    },
  },
};
