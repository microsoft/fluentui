import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
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

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
});

export const SizeLarge = () => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="large">
              Large
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
            <SplitButton menuButton={triggerProps} icon={<CalendarMonth />} size="large">
              Large with calendar icon
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
              content="Large with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="label"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{ ref: setPrimaryActionButtonRef }}
                icon={<CalendarMonth />}
                size="large"
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

SizeLarge.storyName = 'Size: large';
