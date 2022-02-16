import * as React from 'react';
import { CalendarMonthRegular, FilterRegular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { Tooltip } from '@fluentui/react-tooltip';
import { makeStyles } from '@griffel/react';
import { SplitButton, MenuButtonProps } from '../../../index';

const useStyles = makeStyles({
  longText: {
    maxWidth: '350px',
  },
});

export const Icon = () => {
  const [primaryActionButtonRef, setPrimaryActionButtonRef] = React.useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);

  const styles = useStyles();

  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />}>
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
            <SplitButton menuButton={triggerProps} icon={<CalendarMonthRegular />} iconPosition="after">
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
            <SplitButton
              menuButton={triggerProps}
              primaryActionButton={{
                className: styles.longText,
              }}
              icon={<CalendarMonthRegular />}
              menuIcon={<FilterRegular />}
            >
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
                icon={<CalendarMonthRegular />}
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

Icon.parameters = {
  docs: {
    description: {
      story:
        'SplitButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.',
    },
  },
};
