import * as React from 'react';
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
import { CalendarMonthRegular } from '@fluentui/react-icons';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
});

export const SizeMedium = () => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Menu positioning="below-end">
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} size="medium">
              Medium
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
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} size="medium">
              Medium with calendar icon
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
        <MenuTrigger disableButtonEnhancement>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="Medium with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="inaccessible"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{ ref: setPrimaryActionButtonRef, 'aria-label': 'Medium with calendar icon only' }}
                icon={<CalendarMonthRegular />}
                size="medium"
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

SizeMedium.storyName = 'Size: medium';
