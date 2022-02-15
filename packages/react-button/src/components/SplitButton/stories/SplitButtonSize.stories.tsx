import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { SplitButton, MenuButtonProps } from '../../../index';

export const Size = () => {
  return (
    <>
      <Menu positioning="below-end">
        <MenuTrigger>
          {(triggerProps: MenuButtonProps) => (
            <SplitButton menuButton={triggerProps} primaryActionButton={'Size: small'} size="small" />
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
            <SplitButton menuButton={triggerProps} primaryActionButton={'Size: medium'} size="medium" />
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
            <SplitButton menuButton={triggerProps} primaryActionButton={'Size: large'} size="large" />
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

Size.parameters = {
  docs: {
    description: {
      story: 'SplitButton supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
