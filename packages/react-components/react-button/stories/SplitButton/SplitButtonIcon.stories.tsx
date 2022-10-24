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
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
  Tooltip,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const Filter = bundleIcon(FilterFilled, FilterRegular);

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const Icon = () => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonth />}>
              With calendar icon before contents
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonth />} iconPosition="after">
              With calendar icon after contents
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonth />} menuIcon={<Filter />}>
              With calendar icon and custom filter menu icon
            </SplitButton>
          )}
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="With calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="label"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{ ref: setPrimaryActionButtonRef }}
                icon={<CalendarMonth />}
              />
            </Tooltip>
          )}
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
        'SplitButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.',
    },
  },
};
