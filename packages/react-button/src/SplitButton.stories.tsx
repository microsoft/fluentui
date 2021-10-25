import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import { SplitButton, SplitButtonProps } from './SplitButton';

export const Default = (): JSX.Element => {
  return (
    <Menu positioning="below-end">
      <MenuTrigger>
        {triggerProps => <SplitButton menuButton={triggerProps} primaryActionButton={'This is a split button'} />}
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
};
