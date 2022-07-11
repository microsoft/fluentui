import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton, Tooltip } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SizeMedium = () => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger>
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
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonth />} size="medium">
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
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <Tooltip
              content="Medium with calendar icon only"
              positioning={{ target: primaryActionButtonRef }}
              relationship="label"
            >
              <SplitButton
                menuButton={triggerProps}
                primaryActionButton={{ ref: setPrimaryActionButtonRef }}
                icon={<CalendarMonth />}
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
    </>
  );
};

SizeMedium.storyName = 'Size: medium';
