import * as React from 'react';
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular,
  FilterFilled,
  FilterRegular,
} from '@fluentui/react-icons';
import {
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const Filter = bundleIcon(FilterFilled, FilterRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Icon = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu>
        <MenuTrigger>
          <MenuButton icon={<CalendarMonth />}>With calendar icon</MenuButton>
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
          <MenuButton icon={<CalendarMonth />} menuIcon={<Filter />}>
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
            <MenuButton icon={<CalendarMonth />} />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
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
