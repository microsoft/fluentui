import * as React from 'react';
import {
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const WithLongText = () => {
  const styles = useStyles();

  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Short text</SplitButton>}
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
            <SplitButton primaryActionButton={{ className: styles.longText }} menuButton={triggerProps}>
              Long text wraps after it hits the max width of the component
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
